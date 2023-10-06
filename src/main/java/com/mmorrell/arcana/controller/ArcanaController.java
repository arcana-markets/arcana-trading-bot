package com.mmorrell.arcana.controller;

import com.mmorrell.arcana.background.ArcanaBackgroundCache;
import com.mmorrell.arcana.background.MarketCache;
import com.mmorrell.arcana.background.TokenManager;
import com.mmorrell.arcana.pricing.JupiterPricingSource;
import com.mmorrell.arcana.strategies.BotManager;
import com.mmorrell.arcana.strategies.OpenBookBot;
import com.mmorrell.arcana.strategies.openbook.OpenBookSplUsdc;
import com.mmorrell.arcana.util.MarketUtil;
import com.mmorrell.model.OpenBookContext;
import com.mmorrell.model.OpenBookOrder;
import com.mmorrell.serum.manager.SerumManager;
import com.mmorrell.serum.model.Market;
import com.mmorrell.serum.model.OpenOrdersAccount;
import com.mmorrell.serum.model.OrderBook;
import com.mmorrell.serum.model.SerumUtils;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.bitcoinj.core.Base58;
import org.p2p.solanaj.core.Account;
import org.p2p.solanaj.core.PublicKey;
import org.p2p.solanaj.rpc.RpcClient;
import org.p2p.solanaj.rpc.RpcException;
import org.p2p.solanaj.rpc.types.AccountInfo;
import org.p2p.solanaj.rpc.types.TokenAccountInfo;
import org.p2p.solanaj.rpc.types.config.Commitment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@Slf4j
public class ArcanaController {

    private RpcClient rpcClient;
    private final BotManager botManager;
    private final SerumManager serumManager;
    private final JupiterPricingSource jupiterPricingSource;
    private final ArcanaBackgroundCache arcanaBackgroundCache;
    private final MarketCache marketCache;
    private final TokenManager tokenManager;

    public ArcanaController(RpcClient rpcClient, BotManager botManager,
                            SerumManager serumManager, JupiterPricingSource jupiterPricingSource,
                            ArcanaBackgroundCache arcanaBackgroundCache, MarketCache marketCache,
                            TokenManager tokenManager) {
        this.rpcClient = rpcClient;
        this.botManager = botManager;
        this.serumManager = serumManager;
        this.jupiterPricingSource = jupiterPricingSource;
        this.arcanaBackgroundCache = arcanaBackgroundCache;
        this.marketCache = marketCache;
        this.tokenManager = tokenManager;
    }

    @RequestMapping("/")
    public String arcanaIndex(Model model) {
        model.addAttribute("rpcEndpoint", rpcClient.getEndpoint());
        model.addAttribute("botList", botManager.getBotList());
        return "index";
    }

    @RequestMapping("/bots")
    public String arcanaBots(Model model) {
        model.addAttribute("rpcEndpoint", rpcClient.getEndpoint());
        model.addAttribute("botList", botManager.getBotList());
        return "bots/my_bots";
    }

    @RequestMapping("/market-list")
    public String arcanaMarkets(Model model) {
        model.addAttribute("rpcEndpoint", rpcClient.getEndpoint());
        model.addAttribute("markets", arcanaBackgroundCache.getCachedMarkets()
                .stream().sorted((o1, o2) -> (int) (o2.getReferrerRebatesAccrued() - o1.getReferrerRebatesAccrued()))
                .toList());
        return "markets";
    }

    @RequestMapping("/settings")
    public String arcanaSettings(Model model, @RequestParam(required = false) String rpc) {
        if (rpc != null && rpc.length() > 10) {
            // set RPC host
            rpcClient = new RpcClient(rpc);
            log.info("New RPC Host: " + rpc);
        }

        model.addAttribute("rpcEndpoint", rpcClient.getEndpoint());
        model.addAttribute("tradingAccountPubkey", botManager.getTradingAccount().getPublicKey().toBase58());

        return "settings";
    }

    @RequestMapping("/getAccountsByMarket/{marketId}")
    @ResponseBody
    public OpenBookContext getMarketAccounts(Model model, @PathVariable String marketId) {
        PublicKey pubkey = botManager.getTradingAccount().getPublicKey();
        PublicKey marketIdPubkey = new PublicKey(marketId);
        Map<String, Object> results = new HashMap<>();

        // Get market, get base and quote mints. Check if we have wallets for them
        try {
            Market market = Market.readMarket(
                    rpcClient.getApi().getAccountInfo(marketIdPubkey).getDecodedData()
            );
            log.info("Base Mint: " + market.getBaseMint());
            log.info("Quote Mint: " + market.getQuoteMint());

            Map<String, Object> requiredParams = Map.of("mint", market.getBaseMint());
            TokenAccountInfo tokenAccount = rpcClient.getApi().getTokenAccountsByOwner(pubkey, requiredParams,
                    new HashMap<>());
            requiredParams = Map.of("mint", market.getQuoteMint());
            TokenAccountInfo quoteTokenAccount = rpcClient.getApi().getTokenAccountsByOwner(pubkey, requiredParams,
                    new HashMap<>());

            log.info("Our base wallet: " + tokenAccount.getValue().get(0).getPubkey());
            log.info("Our quote wallet: " + quoteTokenAccount.getValue().get(0).getPubkey());

            results.put("baseWallet", tokenAccount.getValue().get(0).getPubkey());
            results.put("quoteWallet", quoteTokenAccount.getValue().get(0).getPubkey());
            results.put("ooa", null);

            OpenBookContext openBookContext = new OpenBookContext();
            openBookContext.setBaseWallet(tokenAccount.getValue().get(0).getPubkey());
            openBookContext.setQuoteWallet(quoteTokenAccount.getValue().get(0).getPubkey());

            // OOA
            final OpenOrdersAccount openOrdersAccount = SerumUtils.findOpenOrdersAccountForOwner(
                    rpcClient,
                    market.getOwnAddress(),
                    pubkey
            );
            openBookContext.setOoa(openOrdersAccount.getOwnPubkey().toBase58());

            return openBookContext;
        } catch (RpcException e) {
            return new OpenBookContext();
        }
    }

    // Adds and starts a new SPL/USDC trading strategy.
    @PostMapping("/bots/add/post")
    public String arcanaBotAdd(@ModelAttribute("newBot") OpenBookBot newBot) {
        // Adds new strategy to list.
        OpenBookSplUsdc openBookSplUsdc = new OpenBookSplUsdc(
                serumManager,
                rpcClient,
                newBot.getMarketId(),
                jupiterPricingSource,
                newBot.getPriceStrategy()
        );
        openBookSplUsdc.setMarketOoa(newBot.getOoa());
        openBookSplUsdc.setBaseWallet(newBot.getBaseWallet());
        openBookSplUsdc.setUsdcWallet(newBot.getQuoteWallet());
        openBookSplUsdc.setMmAccount(botManager.getTradingAccount());
        openBookSplUsdc.setBaseAskAmount((float) newBot.getAmountAsk());
        openBookSplUsdc.setUsdcBidAmount((float) newBot.getAmountBid());

        // bid + ask multiplier
        float bidMultiplier = (10000.0f - (float) newBot.getBpsSpread()) / 10000.0f;
        float askMultiplier = (10000.0f + (float) newBot.getBpsSpread()) / 10000.0f;

        openBookSplUsdc.setBidSpreadMultiplier(bidMultiplier);
        openBookSplUsdc.setAskSpreadMultiplier(askMultiplier);

        newBot.setStrategy(openBookSplUsdc);

        botManager.addBot(newBot);
        log.info("New strategy created/started: " + newBot);

        return "redirect:/";
    }

    @RequestMapping("/openbook")
    public String openbookMarkets(Model model) {
        model.addAttribute("rpcEndpoint", rpcClient.getEndpoint());
        model.addAttribute("markets", arcanaBackgroundCache.getCachedMarkets()
                .stream().sorted((o1, o2) -> (int) (o2.getReferrerRebatesAccrued() - o1.getReferrerRebatesAccrued()))
                .toList());
        return "openbook";
    }

    @RequestMapping("/bots/add")
    public String arcanaBotWizard(Model model, @RequestParam(required = false) String marketId) {
        model.addAttribute("rpcEndpoint", rpcClient.getEndpoint());

        OpenBookBot newBot = new OpenBookBot();
        if (marketId != null) {
            newBot.setMarketId(new PublicKey(marketId));
        }
        model.addAttribute("newBot", newBot);
        model.addAttribute("marketId", marketId);

        return "bots/wizard";
    }

    @RequestMapping("/bots/view/{id}")
    public String arcanaBotWizard(Model model, @PathVariable("id") long botId) {
        model.addAttribute("rpcEndpoint", rpcClient.getEndpoint());
        model.addAttribute("botId", --botId);

        OpenBookBot bot = botManager.getBotList().get((int) botId);
        model.addAttribute("bot", bot.toString());
        model.addAttribute("botUuid", bot.getStrategy().uuid.toString());
        model.addAttribute("botMarketId", bot.getMarketId().toBase58());
        model.addAttribute("botBpsSpread", bot.getBpsSpread());
        model.addAttribute("botAmountBid", bot.getAmountBid());
        model.addAttribute("botAmountAsk", bot.getAmountAsk());
        model.addAttribute("botOoa", bot.getOoa().toBase58());
        model.addAttribute("botBaseWallet", bot.getBaseWallet().toBase58());
        model.addAttribute("botQuoteWallet", bot.getQuoteWallet().toBase58());

        // Strategy
        model.addAttribute("strategyName", bot.getStrategy().getClass().getSimpleName());

        // Last bids / asks
        if (bot.getStrategy() instanceof OpenBookSplUsdc) {
            model.addAttribute("lastBidOrder", ((OpenBookSplUsdc) bot.getStrategy()).getLastBidOrder().toString());
            model.addAttribute("lastAskOrder", ((OpenBookSplUsdc) bot.getStrategy()).getLastAskOrder().toString());
        }

        return "bots/view_bot";
    }

    @RequestMapping("/bots/stop/{id}")
    public String arcanaBotStop(Model model, @PathVariable("id") long botId) {
        botManager.stopBot(botId);
        return "redirect:/";
    }


    @PostMapping("/privateKeyUpload")
    public String privateKeyUpload(@RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {
        try {
            byte[] bytes = file.getBytes();
            botManager.setTradingAccount(Account.fromJson(new String(bytes)));
        } catch (IOException e) {
            redirectAttributes.addAttribute("status", e.getMessage());
        }

        return "redirect:/settings";
    }

    @RequestMapping("/privateKeyPost")
    public String privateKeyPost(Model model, @RequestParam String privateKey) {
        byte[] bytes = Base58.decode(privateKey);
        botManager.setTradingAccount(new Account(bytes));

        return "redirect:/settings";
    }

    @GetMapping(value = "/api/openbook/market/{marketId}")
    @ResponseBody
    public Map<String, Object> getMarket(@PathVariable String marketId) {
        final PublicKey marketPublicKey = PublicKey.valueOf(marketId);
        Optional<Market> market = marketCache.getMarket(marketPublicKey);

        return market.<Map<String, Object>>map(value -> Map.of(
                "bids",
                value.getBids().toBase58(),
                "asks",
                value.getAsks().toBase58())).orElse(Collections.emptyMap());

    }
//
//    @GetMapping(value = "/api/openbook/market/{bidAccountId}/bids")
//    public List<OpenBookOrder> getMarketBids(@PathVariable String bidAccountId) throws RpcException {
//        final PublicKey bidPublicKey = PublicKey.valueOf(bidAccountId);
//        // create a Optional<OrderBook> without cache
//
//        AccountInfo accountInfo = rpcClient.getApi()
//                .getAccountInfo(
//                        bidPublicKey,
//                        Map.of(
//                                "commitment",
//                                Commitment.CONFIRMED
//                        )
//                );
//
//        return buildOrderBook(
//                Base64.getDecoder().decode(
//                        accountInfo.getValue()
//                                .getData()
//                                .get(0)
//                ),
//                cachedMarket
//        );
//
//        if (orderBook.isPresent()) {
//            List<OpenBookOrder> serumOrders = MarketUtil.convertOrderBookToSerumOrders(orderBook.get(), true);
//
//            // Calculate aggregate percentages for each quote, add to metadata
//            float aggregateNotional = serumOrders.stream()
//                    .map(order -> order.getQuantity() * order.getPrice())
//                    .reduce(0f, Float::sum);
//
//            float currentTotal = 0.0f;
//            for (OpenBookOrder order : serumOrders) {
//                float notional = order.getPrice() * order.getQuantity();
//                currentTotal += notional;
//                order.addMetadata("percent", currentTotal / aggregateNotional);
//            }
//
//            return serumOrders;
//        } else {
//            return Collections.emptyList();
//        }
//    }

//    @GetMapping(value = "/api/openbook/market/{marketId}/asks")
//    public List<SerumOrder> getMarketAsks(@PathVariable String marketId, HttpServletResponse response) {
//        final PublicKey marketPublicKey = PublicKey.valueOf(marketId);
//        final Optional<OrderBook> orderBook = marketManager.getCachedAskOrderBook(marketPublicKey);
//
//        if (orderBook.isPresent()) {
//            List<SerumOrder> serumOrders = MarketUtil.convertOrderBookToSerumOrders(orderBook.get(), false);
//
//            // Calculate aggregate percentages for each quote, add to metadata
//            float aggregateNotional = serumOrders.stream()
//                    .map(order -> order.getQuantity() * order.getPrice())
//                    .reduce(0f, Float::sum);
//
//            float currentTotal = 0.0f;
//            for (SerumOrder order : serumOrders) {
//                float notional = order.getPrice() * order.getQuantity();
//                currentTotal += notional;
//                order.addMetadata("percent", currentTotal / aggregateNotional);
//            }
//
//            identityManager.reverseOwnerLookup(serumOrders);
//            return serumOrders;
//        } else {
//            return Collections.emptyList();
//        }
//    }

    private OrderBook buildOrderBook(byte[] data, Market market) {
        OrderBook orderBook = OrderBook.readOrderBook(data);
        orderBook.setBaseDecimals(market.getBaseDecimals());
        orderBook.setQuoteDecimals(market.getQuoteDecimals());
        orderBook.setBaseLotSize(market.getBaseLotSize());
        orderBook.setQuoteLotSize(market.getQuoteLotSize());

        return orderBook;
    }

}
