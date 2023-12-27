package com.mmorrell.arcana.strategies.openbook;

import com.mmorrell.arcana.pricing.JupiterPricingSource;
import com.mmorrell.arcana.pricing.PythPricingSource;
import com.mmorrell.serum.manager.SerumManager;
import com.mmorrell.serum.model.Market;
import com.mmorrell.serum.model.MarketBuilder;
import com.mmorrell.serum.model.Order;
import com.mmorrell.serum.model.OrderTypeLayout;
import com.mmorrell.serum.model.SelfTradeBehaviorLayout;
import com.mmorrell.serum.model.SerumUtils;
import com.mmorrell.serum.program.SerumProgram;
import com.mmorrell.arcana.strategies.Strategy;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.p2p.solanaj.core.Account;
import org.p2p.solanaj.core.PublicKey;
import org.p2p.solanaj.core.Transaction;
import org.p2p.solanaj.programs.ComputeBudgetProgram;
import org.p2p.solanaj.programs.MemoProgram;
import org.p2p.solanaj.programs.SystemProgram;
import org.p2p.solanaj.programs.TokenProgram;
import org.p2p.solanaj.rpc.Cluster;
import org.p2p.solanaj.rpc.RpcClient;
import org.p2p.solanaj.rpc.RpcException;
import org.p2p.solanaj.rpc.types.config.Commitment;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;

//@Component
@Slf4j
@Getter
public class OpenBookSplUsdc extends Strategy {

    private static final int EVENT_LOOP_INITIAL_DELAY_MS = 0;
    private static final int EVENT_LOOP_DURATION_MS = 5000;

    private final RpcClient rpcClient;
    private final RpcClient txClient;
    private final SerumManager serumManager;
    private final ScheduledExecutorService executorService;
    private final JupiterPricingSource jupiterPricingSource;
    private final PythPricingSource pythPricingSource;

    // Dynamic
    private boolean useJupiter = false;
    private double bestBidPrice;
    private double bestAskPrice;

    // Finals
    @Setter
    private Account mmAccount;

    private Market solUsdcMarket;
    private final MarketBuilder solUsdcMarketBuilder;

    @Setter
    private PublicKey marketOoa;

    @Setter
    private PublicKey baseWallet;

    @Setter
    private PublicKey usdcWallet;

    private static long BID_CLIENT_ID;
    private static long ASK_CLIENT_ID;

    private static final float SOL_QUOTE_SIZE = 0.1f;
    public static final int PRIORITY_UNITS = 54_800; // Limit

    @Setter
    private float baseAskAmount = SOL_QUOTE_SIZE;

    @Setter
    private float usdcBidAmount = SOL_QUOTE_SIZE;

    @Setter
    private float askSpreadMultiplier = 1.0012f;

    @Setter
    private float bidSpreadMultiplier = 0.9987f;

    private static final float MIN_MIDPOINT_CHANGE = 0.0010f;

    private float lastPlacedBidPrice = 0.0f, lastPlacedAskPrice = 0.0f;

    @Setter
    private Order lastBidOrder;

    @Setter
    private Order lastAskOrder;

    // Used to delay 2000ms on first order place.
    private static boolean firstLoadComplete = false;

    public OpenBookSplUsdc(final SerumManager serumManager,
                           final RpcClient rpcClient,
                           final PublicKey marketId,
                           final JupiterPricingSource jupiterPricingSource,
                           final String pricingStrategy,
                           final PythPricingSource pythPricingSource) {
        this.executorService = Executors.newSingleThreadScheduledExecutor();

        this.serumManager = serumManager;
        this.rpcClient = rpcClient;
        this.txClient = new RpcClient(Cluster.MAINNET);

        this.solUsdcMarketBuilder = new MarketBuilder()
                .setClient(rpcClient)
                .setPublicKey(marketId)
                .setRetrieveOrderBooks(true);
        this.solUsdcMarket = this.solUsdcMarketBuilder.build();
        this.jupiterPricingSource = jupiterPricingSource;
        this.pythPricingSource = pythPricingSource;

        if (pricingStrategy.equalsIgnoreCase("jupiter")) {
            useJupiter = true;

            Optional<Double> price = jupiterPricingSource.getUsdcPriceForSymbol(solUsdcMarket.getBaseMint().toBase58(),
                    1000);
            if (price.isPresent()) {
                this.bestBidPrice = price.get();
                this.bestAskPrice = price.get();

                if (marketId.equals(new PublicKey("8BnEgHoWFysVcuFFX7QztDmzuH8r5ZFvyP3sYwn1XTh6"))) {
                    double pythBid = pythPricingSource.getSolBidPrice();
                    double pythAsk = pythPricingSource.getSolAskPrice();

                    this.bestBidPrice = (this.bestBidPrice + pythBid) / 2.0;
                    this.bestAskPrice = (this.bestAskPrice + pythAsk) / 2.0;
                }

            }
        }

        BID_CLIENT_ID = ThreadLocalRandom.current().nextLong(1111, 9999999);
        ASK_CLIENT_ID = ThreadLocalRandom.current().nextLong(1111, 9999999);
        log.info("Bid clientId: " + BID_CLIENT_ID + ", Ask: " + ASK_CLIENT_ID);
    }

    @Override
    public void start() {
        log.info(this.getClass().getSimpleName() + " started.");

        // Start loop
        executorService.scheduleAtFixedRate(
                () -> {
                    try {
                        // Get latest prices
                        solUsdcMarket.reload(solUsdcMarketBuilder);

                        if (useJupiter) {
                            Optional<Double> price = jupiterPricingSource.getUsdcPriceForSymbol(solUsdcMarket.getBaseMint().toBase58(),
                                    1000);
                            if (price.isPresent()) {
                                this.bestBidPrice = price.get();
                                this.bestAskPrice = price.get();
                            }
                        } else {
                            this.bestBidPrice = solUsdcMarket.getBidOrderBook().getBestBid().getFloatPrice();
                            this.bestAskPrice = solUsdcMarket.getAskOrderBook().getBestAsk().getFloatPrice();
                        }

                        boolean isCancelBid =
                                solUsdcMarket.getBidOrderBook().getOrders().stream().anyMatch(order -> order.getOwner().equals(marketOoa));
                        long bidOrderIdToCancel = solUsdcMarket.getBidOrderBook().getOrders().stream()
                                .filter(order -> order.getOwner().equals(marketOoa))
                                .map(Order::getClientOrderId)
                                .findFirst()
                                .orElse(0L);

                        float percentageChangeFromLastBid =
                                1.00f - (lastPlacedBidPrice / ((float) bestBidPrice * bidSpreadMultiplier));

                        // Only place bid if we haven't placed, or the change is >= 0.1% change
                        if (lastPlacedBidPrice == 0 || (Math.abs(percentageChangeFromLastBid) >= MIN_MIDPOINT_CHANGE)) {
                            placeUsdcBid(usdcBidAmount, (float) bestBidPrice * bidSpreadMultiplier, isCancelBid, bidOrderIdToCancel);
                            lastPlacedBidPrice = (float) bestBidPrice * bidSpreadMultiplier;
                        }

                        boolean isCancelAsk =
                                solUsdcMarket.getAskOrderBook().getOrders().stream().anyMatch(order -> order.getOwner().equals(marketOoa));
                        long askOrderIdToCancel = solUsdcMarket.getAskOrderBook().getOrders().stream()
                                .filter(order -> order.getOwner().equals(marketOoa))
                                .map(Order::getClientOrderId)
                                .findFirst()
                                .orElse(0L);

                        float percentageChangeFromLastAsk =
                                1.00f - (lastPlacedAskPrice / ((float) bestAskPrice * askSpreadMultiplier));

                        // Only place ask if we haven't placed, or the change is >= 0.1% change
                        if (lastPlacedAskPrice == 0 || (Math.abs(percentageChangeFromLastAsk) >= MIN_MIDPOINT_CHANGE)) {
                            placeSolAsk(baseAskAmount, (float) bestAskPrice * askSpreadMultiplier, isCancelAsk, askOrderIdToCancel);
                            lastPlacedAskPrice = (float) bestAskPrice * askSpreadMultiplier;
                        }

                        if (!firstLoadComplete) {
                            try {
                                log.info("Sleeping 2000ms...");
                                Thread.sleep(2000L);
                                log.info("Fist load complete.");
                            } catch (InterruptedException e) {
                                throw new RuntimeException(e);
                            }
                            firstLoadComplete = true;
                        }
                    } catch (Exception ex) {
                        log.error("Unhandled exception during event loop: " + ex.getMessage());
                        ex.printStackTrace();
                    }
                },
                EVENT_LOOP_INITIAL_DELAY_MS,
                EVENT_LOOP_DURATION_MS,
                TimeUnit.MILLISECONDS
        );
    }

    private void placeSolAsk(float solAmount, float price, boolean cancel, long cancelOrderId) {
        final Transaction placeTx = new Transaction();

        placeTx.addInstruction(
                ComputeBudgetProgram.setComputeUnitPrice(
                        151_420
                )
        );

        placeTx.addInstruction(
                ComputeBudgetProgram.setComputeUnitLimit(
                        54_800
                )
        );

        placeTx.addInstruction(
                SerumProgram.consumeEvents(
                        mmAccount.getPublicKey(),
                        List.of(marketOoa),
                        solUsdcMarket,
                        baseWallet,
                        usdcWallet
                )
        );

        Order askOrder = Order.builder()
                .buy(false)
                .clientOrderId(ASK_CLIENT_ID)
                .orderTypeLayout(OrderTypeLayout.POST_ONLY)
                .selfTradeBehaviorLayout(SelfTradeBehaviorLayout.DECREMENT_TAKE)
                .floatPrice(price)
                .floatQuantity(solAmount)
                .build();

        serumManager.setOrderPrices(askOrder, solUsdcMarket);

        if (cancel) {
            placeTx.addInstruction(
                    SerumProgram.cancelOrderByClientId(
                            solUsdcMarket,
                            marketOoa,
                            mmAccount.getPublicKey(),
                            cancelOrderId
                    )
            );
        }


        // Settle - base wallet gets created first then closed after
        placeTx.addInstruction(
                SerumProgram.settleFunds(
                        solUsdcMarket,
                        marketOoa,
                        mmAccount.getPublicKey(),
                        baseWallet, //random wsol acct for settles
                        usdcWallet
                )
        );

        placeTx.addInstruction(
                SerumProgram.placeOrder(
                        mmAccount,
                        baseWallet,
                        marketOoa,
                        solUsdcMarket,
                        askOrder
                )
        );

        try {
            String orderTx = txClient.getApi().sendTransaction(placeTx, mmAccount);
            log.info("Base Ask: " + askOrder.getFloatQuantity() + " @ " + askOrder.getFloatPrice() + ", " + orderTx);
            lastAskOrder = askOrder;
        } catch (RpcException e) {
            log.error("OrderTx Error = " + e.getMessage());
        }
    }

    private void placeUsdcBid(float amount, float price, boolean cancel, long cancelOrderId) {
        final Transaction placeTx = new Transaction();

        placeTx.addInstruction(
                ComputeBudgetProgram.setComputeUnitPrice(
                        151_420
                )
        );

        placeTx.addInstruction(
                ComputeBudgetProgram.setComputeUnitLimit(
                        54_800
                )
        );

        placeTx.addInstruction(
                SerumProgram.consumeEvents(
                        mmAccount.getPublicKey(),
                        List.of(marketOoa),
                        solUsdcMarket,
                        baseWallet,
                        usdcWallet
                )
        );

        Order bidOrder = Order.builder()
                .buy(true)
                .clientOrderId(BID_CLIENT_ID)
                .orderTypeLayout(OrderTypeLayout.POST_ONLY)
                .selfTradeBehaviorLayout(SelfTradeBehaviorLayout.DECREMENT_TAKE)
                .floatPrice(price)
                .floatQuantity(amount)
                .build();

        serumManager.setOrderPrices(bidOrder, solUsdcMarket);

        if (cancel) {
            placeTx.addInstruction(
                    SerumProgram.cancelOrderByClientId(
                            solUsdcMarket,
                            marketOoa,
                            mmAccount.getPublicKey(),
                            cancelOrderId
                    )
            );
        }


        // Settle - base wallet gets created first then closed after
        placeTx.addInstruction(
                SerumProgram.settleFunds(
                        solUsdcMarket,
                        marketOoa,
                        mmAccount.getPublicKey(),
                        baseWallet, //random wsol acct for settles
                        usdcWallet
                )
        );

        placeTx.addInstruction(
                SerumProgram.placeOrder(
                        mmAccount,
                        usdcWallet,
                        marketOoa,
                        solUsdcMarket,
                        bidOrder
                )
        );

        try {
            String orderTx = txClient.getApi().sendTransaction(placeTx, mmAccount);
            log.info("Quote Bid: " + bidOrder.getFloatQuantity() + " @ " + bidOrder.getFloatPrice() + ", " + orderTx);
            lastBidOrder = bidOrder;
        } catch (RpcException e) {
            log.error("OrderTx Error = " + e.getMessage());
        }
    }

    @Override
    public void stop() {
        // CXL open orders
        log.info("Stopping bot on market {} and settling orders...", solUsdcMarket.getOwnAddress().toBase58());
        executorService.shutdown();
        hardCancelAndSettle();
        log.info("Bot stopped on market {}.", solUsdcMarket.getOwnAddress().toBase58());
    }

    public void hardCancelAndSettle() {
        Account account = mmAccount;
        Account sessionWsolAccount = new Account();
        Transaction newTx = new Transaction();
        newTx.addInstruction(
                ComputeBudgetProgram.setComputeUnitPrice(
                        690_000
                )
        );

        newTx.addInstruction(
                ComputeBudgetProgram.setComputeUnitLimit(
                        PRIORITY_UNITS * 4
                )
        );

        // Create WSOL account for session. 0.5 to start
        newTx.addInstruction(
                SystemProgram.createAccount(
                        account.getPublicKey(),
                        sessionWsolAccount.getPublicKey(),
                        (long) (0.03 * 1000000000.0) + 2039280, //.05 SOL
                        165,
                        TokenProgram.PROGRAM_ID
                )
        );

        newTx.addInstruction(
                TokenProgram.initializeAccount(
                        sessionWsolAccount.getPublicKey(),
                        SerumUtils.WRAPPED_SOL_MINT,
                        account.getPublicKey()
                )
        );

        newTx.addInstruction(
                SerumProgram.cancelOrderByClientId(
                        solUsdcMarket,
                        marketOoa,
                        account.getPublicKey(),
                        ASK_CLIENT_ID
                )
        );

        newTx.addInstruction(
                SerumProgram.settleFunds(
                        solUsdcMarket,
                        marketOoa,
                        account.getPublicKey(),
                        sessionWsolAccount.getPublicKey(),
                        usdcWallet
                )
        );

        newTx.addInstruction(TokenProgram.closeAccount(
                sessionWsolAccount.getPublicKey(),
                account.getPublicKey(),
                account.getPublicKey()
        ));

        try {
            log.info("ASK cxl = " + rpcClient.getApi().sendTransaction(newTx, List.of(account,
                            sessionWsolAccount),
                    rpcClient.getApi().getRecentBlockhash(Commitment.PROCESSED)));
            log.info("Settled asks on market {}", solUsdcMarket.getOwnAddress().toBase58());
        } catch (RpcException e) {
            log.error(e.getMessage());
        }

        ////////////////////////////// BID

        Account sessionWsolAccount2 = new Account();
        Transaction newTx2 = new Transaction();
        newTx2.addInstruction(
                ComputeBudgetProgram.setComputeUnitPrice(
                        890_000
                )
        );

        newTx2.addInstruction(
                ComputeBudgetProgram.setComputeUnitLimit(
                        PRIORITY_UNITS
                )
        );

        // Create WSOL account for session. 0.5 to start
        newTx2.addInstruction(
                SystemProgram.createAccount(
                        account.getPublicKey(),
                        sessionWsolAccount2.getPublicKey(),
                        (long) (0.03 * 1000000000.0) + 2039280, //.05 SOL
                        165,
                        TokenProgram.PROGRAM_ID
                )
        );

        newTx2.addInstruction(
                TokenProgram.initializeAccount(
                        sessionWsolAccount2.getPublicKey(),
                        SerumUtils.WRAPPED_SOL_MINT,
                        account.getPublicKey()
                )
        );


        newTx2.addInstruction(
                SerumProgram.cancelOrderByClientId(
                        solUsdcMarket,
                        marketOoa,
                        account.getPublicKey(),
                        BID_CLIENT_ID
                )
        );

        newTx2.addInstruction(
                SerumProgram.settleFunds(
                        solUsdcMarket,
                        marketOoa,
                        account.getPublicKey(),
                        sessionWsolAccount2.getPublicKey(), //random wsol acct for settles
                        usdcWallet
                )
        );

        newTx2.addInstruction(TokenProgram.closeAccount(
                sessionWsolAccount2.getPublicKey(),
                account.getPublicKey(),
                account.getPublicKey()
        ));

        try {
            log.info("BID cxl = " + rpcClient.getApi().sendTransaction(newTx2, List.of(account,
                            sessionWsolAccount2),
                    rpcClient.getApi().getRecentBlockhash(Commitment.PROCESSED)));
            log.info("Settled bids on market {}", solUsdcMarket.getOwnAddress().toBase58());
        } catch (RpcException e) {
            log.error(e.getMessage());
        }
    }
}
