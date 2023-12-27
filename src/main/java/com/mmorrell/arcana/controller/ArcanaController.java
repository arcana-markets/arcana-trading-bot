package com.mmorrell.arcana.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.Resources;
import com.mmorrell.arcana.background.ArcanaAccountManager;
import com.mmorrell.arcana.background.ArcanaBackgroundCache;
import com.mmorrell.arcana.background.MarketCache;
import com.mmorrell.arcana.background.TokenManager;
import com.mmorrell.arcana.pricing.JupiterPricingSource;
import com.mmorrell.arcana.pricing.PythPricingSource;
import com.mmorrell.arcana.strategies.BotManager;
import com.mmorrell.arcana.strategies.OpenBookBot;
import com.mmorrell.arcana.strategies.openbook.OpenBookSplUsdc;
import com.mmorrell.arcana.strategies.phoenix.PhoenixSplUsdc;
import com.mmorrell.arcana.util.MarketUtil;
import com.mmorrell.model.OpenBookContext;
import com.mmorrell.model.OpenBookOrder;
import com.mmorrell.model.PhoenixNormalizedOrder;
import com.mmorrell.phoenix.manager.PhoenixManager;
import com.mmorrell.phoenix.model.PhoenixMarket;
import com.mmorrell.phoenix.model.PhoenixOrder;
import com.mmorrell.serum.manager.OrderBookCacheManager;
import com.mmorrell.serum.manager.SerumManager;
import com.mmorrell.serum.model.Market;
import com.mmorrell.serum.model.OpenOrdersAccount;
import com.mmorrell.serum.model.OrderBook;
import com.mmorrell.serum.model.SerumUtils;
import lombok.extern.slf4j.Slf4j;
import org.bitcoinj.core.Base58;
import org.json.JSONArray;
import org.p2p.solanaj.core.Account;
import org.p2p.solanaj.core.PublicKey;
import org.p2p.solanaj.rpc.RpcClient;
import org.p2p.solanaj.rpc.RpcException;
import org.p2p.solanaj.rpc.types.TokenAccountInfo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@Slf4j
public class ArcanaController {

    private RpcClient rpcClient;
    private final BotManager botManager;
    private final JupiterPricingSource jupiterPricingSource;
    private final ArcanaBackgroundCache arcanaBackgroundCache;
    private final MarketCache marketCache;
    private final TokenManager tokenManager;
    private OrderBookCacheManager orderBookCacheManager;
    private final ArcanaAccountManager arcanaAccountManager;
    private final PhoenixManager phoenixManager;
    private final PythPricingSource pythPricingSource;

    public ArcanaController(RpcClient rpcClient, BotManager botManager,
                            JupiterPricingSource jupiterPricingSource,
                            ArcanaBackgroundCache arcanaBackgroundCache, MarketCache marketCache,
                            TokenManager tokenManager, ArcanaAccountManager arcanaAccountManager,
                            PhoenixManager phoenixManager, PythPricingSource pythPricingSource) {
        this.rpcClient = rpcClient;
        this.botManager = botManager;
        this.jupiterPricingSource = jupiterPricingSource;
        this.arcanaBackgroundCache = arcanaBackgroundCache;
        this.marketCache = marketCache;
        this.tokenManager = tokenManager;
        this.orderBookCacheManager = new OrderBookCacheManager(rpcClient);
        this.arcanaAccountManager = arcanaAccountManager;
        this.phoenixManager = phoenixManager;
        this.pythPricingSource = pythPricingSource;
    }

    @RequestMapping("/")
    public String arcanaIndex(Model model) {
        model.addAttribute("rpcEndpoint", rpcClient.getEndpoint());
        model.addAttribute("botList", botManager.getBotList());
        try {
            double walletBalance = rpcClient.getApi().getBalance(botManager.getTradingAccount().getPublicKey());
            model.addAttribute("walletBalance", walletBalance / 1_000_000_000.0);
        } catch (RpcException e) {
            model.addAttribute("walletBalance", 0.0);
        }

        // USDC Balance
        try {
            TokenAccountInfo usdcBalance =
                    rpcClient.getApi().getTokenAccountsByOwner(botManager.getTradingAccount().getPublicKey(),
                            Map.of("mint", MarketUtil.USDC_MINT.toBase58()), Map.of());
            if (!usdcBalance.getValue().isEmpty()) {
                model.addAttribute("usdcBalance",
                        usdcBalance.getValue().get(0).getAccount().getData().getParsed().getInfo().getTokenAmount().getUiAmountString());
            } else {
                model.addAttribute("usdcBalance", 0.0);
            }
        } catch (RpcException e) {
            model.addAttribute("usdcBalance", 0.0);
        }

        // WBTC Balance
        try {
            TokenAccountInfo usdcBalance =
                    rpcClient.getApi().getTokenAccountsByOwner(botManager.getTradingAccount().getPublicKey(),
                            Map.of("mint", MarketUtil.WBTC_MINT.toBase58()), Map.of());
            if (!usdcBalance.getValue().isEmpty()) {
                model.addAttribute("wbtcBalance",
                        usdcBalance.getValue().get(0).getAccount().getData().getParsed().getInfo().getTokenAmount().getUiAmountString());
            } else {
                model.addAttribute("wbtcBalance", 0.0);
            }
        } catch (RpcException e) {
            model.addAttribute("wbtcBalance", 0.0);
        }

        // WETH Balance
        try {
            TokenAccountInfo usdcBalance =
                    rpcClient.getApi().getTokenAccountsByOwner(botManager.getTradingAccount().getPublicKey(),
                            Map.of("mint", "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs"), Map.of());
            if (!usdcBalance.getValue().isEmpty()) {
                model.addAttribute("wethBalance",
                        usdcBalance.getValue().get(0).getAccount().getData().getParsed().getInfo().getTokenAmount().getUiAmountString());
            } else {
                model.addAttribute("wethBalance", 0.0);
            }
        } catch (RpcException e) {
            model.addAttribute("wethBalance", 0.0);
        }

        // MNGO Balance
        try {
            TokenAccountInfo usdcBalance =
                    rpcClient.getApi().getTokenAccountsByOwner(botManager.getTradingAccount().getPublicKey(),
                            Map.of("mint", "MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac"), Map.of());
            if (!usdcBalance.getValue().isEmpty()) {
                model.addAttribute("mngoBalance",
                        usdcBalance.getValue().get(0).getAccount().getData().getParsed().getInfo().getTokenAmount().getUiAmountString());
            } else {
                model.addAttribute("mngoBalance", 0.0);
            }
        } catch (RpcException e) {
            model.addAttribute("mngoBalance", 0.0);
        }

        return "index";
    }

    @RequestMapping("/onboarding")
    public String arcanaOnBoarding(Model model) {
        model.addAttribute("rpcEndpoint", rpcClient.getEndpoint());
        model.addAttribute("botList", botManager.getBotList());
        return "onboarding";
    }

    @RequestMapping("/quests")
    public String arcanaQuests(Model model) {
        model.addAttribute("rpcEndpoint", rpcClient.getEndpoint());
        model.addAttribute("botList", botManager.getBotList());
        return "quests";
    }

    @RequestMapping("/bots")
    public String arcanaBots(Model model) {
        model.addAttribute("rpcEndpoint", rpcClient.getEndpoint());
        model.addAttribute("botList", botManager.getBotList());
        return "bots/my_bots";
    }

    @RequestMapping("/markets")
    public String arcanaMarkets(Model model) throws IOException {
        model.addAttribute("rpcEndpoint", rpcClient.getEndpoint());
        String marketsString = Resources.toString(Resources.getResource("static/js/markets.json"),
                StandardCharsets.UTF_8);
        List<Map<String, Object>> markets = new ObjectMapper().readValue(marketsString, new TypeReference<>() {
        });
        model.addAttribute("markets", markets);
        return "markets";
    }

    @RequestMapping("/settings")
    public String arcanaSettings(Model model, @RequestParam(required = false) String rpc) {
        if (rpc != null && rpc.length() > 10) {
            // set RPC host
            rpcClient = new RpcClient(rpc);
            marketCache.setRpcClient(rpcClient);
            orderBookCacheManager = new OrderBookCacheManager(rpcClient);
            log.info("New RPC Host: " + rpc);
        }

        model.addAttribute("rpcEndpoint", rpcClient.getEndpoint());
        model.addAttribute("tradingAccountPubkey", botManager.getTradingAccount().getPublicKey().toBase58());
        model.addAttribute("arcanaAccounts", arcanaAccountManager.getArcanaAccounts());

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

            log.info("Searching for tokens accounts for: " + pubkey.toBase58());
            Map<String, Object> requiredParams = Map.of("mint", market.getBaseMint());
            TokenAccountInfo tokenAccount = rpcClient.getApi().getTokenAccountsByOwner(pubkey, requiredParams,
                    new HashMap<>());
            log.info(Arrays.toString(tokenAccount.getValue().toArray()));
            requiredParams = Map.of("mint", market.getQuoteMint());
            TokenAccountInfo quoteTokenAccount = rpcClient.getApi().getTokenAccountsByOwner(pubkey, requiredParams,
                    new HashMap<>());
            log.info(Arrays.toString(quoteTokenAccount.getValue().toArray()));

            OpenBookContext openBookContext = new OpenBookContext();

            // if base wallet found
            TokenAccountInfo.Value baseValue = !tokenAccount.getValue().isEmpty() ? tokenAccount.getValue().get(0) :
                    null;
            if (baseValue != null) {
                log.info("Our base wallet: " + baseValue.getPubkey());
                results.put("baseWallet", baseValue.getPubkey());
                openBookContext.setBaseWallet(baseValue.getPubkey());

            }

            // if quote wallet found
            TokenAccountInfo.Value quoteValue = !quoteTokenAccount.getValue().isEmpty() ? quoteTokenAccount.getValue().get(0) :
                    null;
            if (quoteValue != null) {
                log.info("Our quote wallet: " + quoteValue.getPubkey());
                results.put("quoteWallet", quoteValue.getPubkey());
                openBookContext.setQuoteWallet(quoteValue.getPubkey());
            }

            results.put("ooa", null);

            // todo handle timeout exception
            // OOA
            final OpenOrdersAccount openOrdersAccount = SerumUtils.findOpenOrdersAccountForOwner(
                    rpcClient,
                    market.getOwnAddress(),
                    pubkey
            );
            if (openOrdersAccount != null) {
                openBookContext.setOoa(openOrdersAccount.getOwnPubkey().toBase58());
            }
            return openBookContext;
        } catch (RpcException e) {
            return new OpenBookContext();
        }
    }

    // Adds and starts a new SPL/USDC trading strategy.
    @PostMapping("/bots/add/post")
    public String arcanaBotAdd(@ModelAttribute("newBot") OpenBookBot newBot) {
        // Check DEX
        if (newBot.getDex().equals("openbook")) {
            // Make OpenBook v1 bot
            OpenBookSplUsdc openBookSplUsdc = new OpenBookSplUsdc(
                    new SerumManager(rpcClient),
                    rpcClient,
                    newBot.getMarketId(),
                    jupiterPricingSource,
                    newBot.getPriceStrategy(),
                    pythPricingSource
            );

            // Check for OOA. If it doesn't exist, create it.
            final OpenOrdersAccount openOrdersAccount = SerumUtils.findOpenOrdersAccountForOwner(
                    rpcClient,
                    newBot.getMarketId(),
                    botManager.getTradingAccount().getPublicKey()
            );

            if (openOrdersAccount != null) {
                log.info("Using OOA for bot: " + openOrdersAccount.getOwnPubkey().toBase58());
                openBookSplUsdc.setMarketOoa(openOrdersAccount.getOwnPubkey());
            } else {
                // Create OOA
                log.info("Creating OOA for bot market: " + newBot.getMarketId().toBase58());
                PublicKey newOoa = arcanaBackgroundCache.generateOoa(
                        botManager.getTradingAccount(),
                        newBot.getMarketId()
                );
                log.info("Using OOA for bot: " + newOoa.toBase58());
                openBookSplUsdc.setMarketOoa(newOoa);
            }

            newBot.setOoa(openBookSplUsdc.getMarketOoa());
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
            log.info("New OpenBook strategy created/started: " + newBot);
        } else if (newBot.getDex().equals("phoenix")) {
            // Make phoenix bot
            PhoenixSplUsdc phoenixSplUsdc = createPhoenixSplUsdcStrategy(newBot);
            newBot.setStrategy(phoenixSplUsdc);
            botManager.addBot(newBot);

            log.info("New Phoenix strategy created/started: " + newBot);
        }

        return "redirect:/bots";
    }

    private PhoenixSplUsdc createPhoenixSplUsdcStrategy(OpenBookBot newBot) {
        PhoenixSplUsdc phoenixSplUsdc = new PhoenixSplUsdc(
                rpcClient,
                newBot.getMarketId(),
                jupiterPricingSource,
                newBot.getPriceStrategy()
        );

        phoenixSplUsdc.setBaseWallet(newBot.getBaseWallet());
        phoenixSplUsdc.setQuoteWallet(newBot.getQuoteWallet());
        phoenixSplUsdc.setMmAccount(botManager.getTradingAccount());
        phoenixSplUsdc.setBaseAmountAsk((float) newBot.getAmountAsk());
        phoenixSplUsdc.setQuoteAmountBid((float) newBot.getAmountBid());

        // bid + ask multiplier
        float bidMultiplier = (10000.0f - (float) newBot.getBpsSpread()) / 10000.0f;
        float askMultiplier = (10000.0f + (float) newBot.getBpsSpread()) / 10000.0f;

        phoenixSplUsdc.setBidSpreadMultiplier(bidMultiplier);
        phoenixSplUsdc.setAskSpreadMultiplier(askMultiplier);
        return phoenixSplUsdc;
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
        model.addAttribute("dexName", bot.getDex());
        model.addAttribute("botBpsSpread", bot.getBpsSpread());
        model.addAttribute("botAmountBid", bot.getAmountBid());
        model.addAttribute("botAmountAsk", bot.getAmountAsk());
        if (bot.getOoa() != null) {
            model.addAttribute("botOoa", bot.getOoa().toBase58());
        }
        model.addAttribute("botBaseWallet", bot.getBaseWallet().toBase58());
        model.addAttribute("botQuoteWallet", bot.getQuoteWallet().toBase58());

        // Strategy
        model.addAttribute("strategyName", bot.getStrategy().getClass().getSimpleName());
        model.addAttribute("traderPubkey", botManager.getTradingAccount().getPublicKey().toBase58());

        // Last bids / asks
        if (bot.getStrategy() instanceof OpenBookSplUsdc) {
            model.addAttribute("lastBidOrder", ((OpenBookSplUsdc) bot.getStrategy()).getLastBidOrder().toString());
            model.addAttribute("lastAskOrder", ((OpenBookSplUsdc) bot.getStrategy()).getLastAskOrder().toString());
        } else if (bot.getStrategy() instanceof PhoenixSplUsdc) {
            PhoenixSplUsdc strategy = (PhoenixSplUsdc) bot.getStrategy();

            model.addAttribute("lastBidOrder",
                    MarketUtil.convertPhoenixOrderToString(strategy.getLastBid(), strategy.getLastBidSize())
            );
            model.addAttribute("lastAskOrder",
                    MarketUtil.convertPhoenixOrderToString(strategy.getLastAsk(), strategy.getLastAskSize())
            );
        }

        return "bots/view_bot";
    }

    @RequestMapping("/bots/stop/{id}")
    public String arcanaBotStop(Model model, @PathVariable("id") long botId) {
        botManager.stopBot(--botId);
        return "redirect:/bots";
    }


    @PostMapping("/privateKeyUpload")
    public String privateKeyUpload(@RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {
        try {
            byte[] bytes = file.getBytes();
            botManager.setTradingAccount(Account.fromJson(new String(bytes)));

            // if a new account, add to our cache / like a Set
            if (arcanaAccountManager.getArcanaAccounts().stream()
                    .noneMatch(account -> account.getPublicKey().toBase58()
                            .equals(botManager.getTradingAccount().getPublicKey().toBase58()))) {
                arcanaAccountManager.getArcanaAccounts().add(botManager.getTradingAccount());
            }
        } catch (IOException e) {
            redirectAttributes.addAttribute("status", e.getMessage());
        }

        return "redirect:/settings";
    }

    @RequestMapping("/privateKeyPost")
    public String privateKeyPost(Model model, @RequestParam String privateKey) {
        byte[] bytes = Base58.decode(privateKey);
        botManager.setTradingAccount(new Account(bytes));

        // if a new account, add to our cache
        if (arcanaAccountManager.getArcanaAccounts().stream()
                .noneMatch(account -> account.getPublicKey().toBase58()
                        .equals(botManager.getTradingAccount().getPublicKey().toBase58()))) {
            arcanaAccountManager.getArcanaAccounts().add(botManager.getTradingAccount());
        }

        return "redirect:/settings";
    }

    @RequestMapping("/api/openbook/market/{marketId}")
    @ResponseBody
    public Map<String, Object> getMarket(@PathVariable String marketId) {
        /*
        This is called in an AJAX loop
        Returns: bid orderbook + ask orderbook
         */
        final PublicKey marketPublicKey = PublicKey.valueOf(marketId);
        Optional<Market> market = marketCache.getMarket(marketPublicKey);
        final Map<String, Object> results = new HashMap<>();

        if (market.isPresent()) {
            Market ourMarket = market.get();
            OrderBook bidOrderBook = orderBookCacheManager.getOrderBook(ourMarket.getBids());
            bidOrderBook.setBaseDecimals((byte) tokenManager.getDecimals(ourMarket.getBaseMint()));
            bidOrderBook.setQuoteDecimals((byte) tokenManager.getDecimals(ourMarket.getQuoteMint()));
            bidOrderBook.setBaseLotSize(ourMarket.getBaseLotSize());
            bidOrderBook.setQuoteLotSize(ourMarket.getQuoteLotSize());

            List<OpenBookOrder> openBookBidOrders = MarketUtil.convertOrderBookToSerumOrders(bidOrderBook, true);

            // Calculate aggregate percentages for each quote, add to metadata
            float aggregateNotional = openBookBidOrders.stream()
                    .map(order -> order.getQuantity() * order.getPrice())
                    .reduce(0f, Float::sum);

            float currentTotal = 0.0f;
            for (OpenBookOrder order : openBookBidOrders) {
                float notional = order.getPrice() * order.getQuantity();
                currentTotal += notional;
                order.addMetadata("percent", currentTotal / aggregateNotional);
            }

            results.put("bidOrders", openBookBidOrders);

            // asks
            OrderBook askOrderBook = orderBookCacheManager.getOrderBook(ourMarket.getAsks());
            askOrderBook.setBaseDecimals((byte) tokenManager.getDecimals(ourMarket.getBaseMint()));
            askOrderBook.setQuoteDecimals((byte) tokenManager.getDecimals(ourMarket.getQuoteMint()));
            askOrderBook.setBaseLotSize(ourMarket.getBaseLotSize());
            askOrderBook.setQuoteLotSize(ourMarket.getQuoteLotSize());

            List<OpenBookOrder> openBookAskOrders = MarketUtil.convertOrderBookToSerumOrders(askOrderBook, false);

            // Calculate aggregate percentages for each quote, add to metadata
            float aggregateNotionalAsk = openBookAskOrders.stream()
                    .map(order -> order.getQuantity() * order.getPrice())
                    .reduce(0f, Float::sum);

            float currentTotalAsk = 0.0f;
            for (OpenBookOrder order : openBookAskOrders) {
                float notional = order.getPrice() * order.getQuantity();
                currentTotalAsk += notional;
                order.addMetadata("percent", currentTotalAsk / aggregateNotionalAsk);
            }

            results.put("askOrders", openBookAskOrders);
        }

        results.put("marketId", marketId);
        return results;
    }

    @RequestMapping("/api/phoenix/market/{marketId}")
    @ResponseBody
    public Map<String, Object> getPhoenixMarket(@PathVariable String marketId) {
        final PublicKey marketPublicKey = PublicKey.valueOf(marketId);
        Optional<PhoenixMarket> phoenixMarket = phoenixManager.getMarket(marketPublicKey, false);
        final Map<String, Object> results = new HashMap<>();

        if (phoenixMarket.isPresent()) {
            PhoenixMarket market = phoenixMarket.get();

            List<PhoenixNormalizedOrder> normalizedBids = market.getBidListNormalized().stream()
                    .sorted(Comparator.comparingDouble(PhoenixOrder::getPrice).reversed())
                    .map(phoenixOrder -> PhoenixNormalizedOrder.builder()
                            .quantity(phoenixOrder.getSize())
                            .price(phoenixOrder.getPrice())
                            .owner(phoenixOrder.getTrader())
                            .build())
                    .toList();

            results.put("bidOrders", normalizedBids);

            List<PhoenixNormalizedOrder> normalizedAsks = market.getAskListNormalized().stream()
                    .map(phoenixOrder -> PhoenixNormalizedOrder.builder()
                            .quantity(phoenixOrder.getSize())
                            .price(phoenixOrder.getPrice())
                            .owner(phoenixOrder.getTrader())
                            .build())
                    .toList();
            results.put("askOrders", normalizedAsks);
        }

        results.put("marketId", marketId);
        return results;
    }

    @RequestMapping("/settings/localStorage")
    public String localStorage(Model model, @RequestParam String localStorage) {
        log.info("localStorage: " + localStorage);

        JSONArray jsonArray = new JSONArray(localStorage);
        jsonArray.forEach(privateKey -> {
            byte[] privateKeyBytes = Base58.decode(privateKey.toString());
            Account newAccount = new Account(privateKeyBytes);
            log.info("New account from LS: " + newAccount.getPublicKey().toBase58());
            if (arcanaAccountManager.getArcanaAccounts().stream()
                    .noneMatch(account -> account.getPublicKey().toBase58()
                            .equals(newAccount.getPublicKey().toBase58()))) {
                arcanaAccountManager.getArcanaAccounts().add(newAccount);
            }
        });

        return "redirect:/settings";
    }

    @RequestMapping("/bots/use/{id}")
    public String useTradingAccount(Model model, @PathVariable("id") long botId) {
        botManager.setTradingAccount(arcanaAccountManager.getArcanaAccounts().get((int) botId));
        return "redirect:/settings";
    }

    @RequestMapping("/wrap/{amountSol}")
    @ResponseBody
    public Map<String, String> wrapSol(Model model, @PathVariable Double amountSol) {
        return Map.of(
                "wsolPubkey",
                arcanaBackgroundCache.wrapSol(
                        botManager.getTradingAccount(),
                        amountSol
                ).toBase58()
        );
    }

    @RequestMapping("/generateOoa/{marketId}")
    @ResponseBody
    public Map<String, String> generateOoa(Model model, @PathVariable("marketId") String marketId) {
        return Map.of("ooa", arcanaBackgroundCache.generateOoa(
                botManager.getTradingAccount(), new PublicKey(marketId)
        ).toBase58());
    }

    @RequestMapping("/accounts/getAllAccounts")
    @ResponseBody
    public List<Map<String, String>> getAllAccounts(Model model) {
        return arcanaAccountManager.getArcanaAccounts().stream()
                .map(account -> Map.of("pubkey", account.getPublicKey().toBase58()))
                .toList();
    }

    @RequestMapping("/accounts/getAllPrivateAccounts")
    @ResponseBody
    public List<Map<String, String>> getAllPrivateAccounts(Model model) {
        return arcanaAccountManager.getArcanaAccounts().stream()
                .map(account -> Map.of("privatekey", Base58.encode(account.getSecretKey())))
                .toList();
    }

    @RequestMapping("/accounts/clear")
    public String clearAccounts(Model model) {
        arcanaAccountManager.setArcanaAccounts(new ArrayList<>());
        return "settings";
    }

}
