package com.mmorrell.arcana.strategies.phoenix;

import com.mmorrell.arcana.pricing.JupiterPricingSource;
import com.mmorrell.arcana.strategies.Strategy;
import com.mmorrell.phoenix.model.PhoenixMarket;
import com.mmorrell.serum.manager.SerumManager;
import com.mmorrell.serum.model.MarketBuilder;
import com.mmorrell.serum.model.Order;
import com.mmorrell.serum.model.OrderTypeLayout;
import com.mmorrell.serum.model.SelfTradeBehaviorLayout;
import com.mmorrell.serum.model.SerumUtils;
import com.mmorrell.serum.program.SerumProgram;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.p2p.solanaj.core.Account;
import org.p2p.solanaj.core.PublicKey;
import org.p2p.solanaj.core.Transaction;
import org.p2p.solanaj.programs.ComputeBudgetProgram;
import org.p2p.solanaj.programs.SystemProgram;
import org.p2p.solanaj.programs.TokenProgram;
import org.p2p.solanaj.rpc.RpcClient;
import org.p2p.solanaj.rpc.RpcException;
import org.p2p.solanaj.rpc.types.config.Commitment;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;

//@Component
@Slf4j
@Getter
public class PhoenixSplUsdc extends Strategy {

    private static final int EVENT_LOOP_INITIAL_DELAY_MS = 0;
    private static final int EVENT_LOOP_DURATION_MS = 5000;

    private final RpcClient rpcClient;
    private final ScheduledExecutorService executorService;
    private final JupiterPricingSource jupiterPricingSource;

    // Dynamic
    private boolean useJupiter = false;
    private double bestBidPrice;
    private double bestAskPrice;

    // Finals
    @Setter
    private Account mmAccount;

    private PublicKey marketId;
    private PhoenixMarket market;

    @Setter
    private PublicKey baseWallet;

    @Setter
    private PublicKey usdcWallet;

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

    public PhoenixSplUsdc(final RpcClient rpcClient,
                          final PublicKey marketId,
                          final JupiterPricingSource jupiterPricingSource,
                          final String pricingStrategy) {
        this.executorService = Executors.newSingleThreadScheduledExecutor();
        this.rpcClient = rpcClient;
        this.jupiterPricingSource = jupiterPricingSource;
        this.marketId = marketId;

        if (pricingStrategy.equalsIgnoreCase("jupiter")) {
            useJupiter = true;

            Optional<Double> price =
                    jupiterPricingSource.getUsdcPriceForSymbol(market.getPhoenixMarketHeader().getBaseMintKey().toBase58(),
                    1000);
            if (price.isPresent()) {
                this.bestBidPrice = price.get();
                this.bestAskPrice = price.get();
            }
        }
    }

    @Override
    public void start() {
        log.info(this.getClass().getSimpleName() + " started.");

        // Start loop
        executorService.scheduleAtFixedRate(
                () -> {
                    try {
                        // Get latest prices
                        market = PhoenixMarket.readPhoenixMarket(
                                rpcClient.getApi().getAccountInfo(marketId).getDecodedData()
                        );

                        if (useJupiter) {
                            Optional<Double> price = jupiterPricingSource.getUsdcPriceForSymbol(market.getPhoenixMarketHeader().getBaseMintKey().toBase58(),
                                    1000);
                            if (price.isPresent()) {
                                this.bestBidPrice = price.get();
                                this.bestAskPrice = price.get();
                            }
                        } else {
                            this.bestBidPrice = market.getBestBid().getFirst().getPriceInTicks();
                            this.bestAskPrice = market.getBestAsk().getFirst().getPriceInTicks();
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

    private void placeSolAsk(float solAmount, float price, boolean cancel) {
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
                        market,
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

        serumManager.setOrderPrices(askOrder, market);

        if (cancel) {
            placeTx.addInstruction(
                    SerumProgram.cancelOrderByClientId(
                            market,
                            marketOoa,
                            mmAccount.getPublicKey(),
                            ASK_CLIENT_ID
                    )
            );
        }


        // Settle - base wallet gets created first then closed after
        placeTx.addInstruction(
                SerumProgram.settleFunds(
                        market,
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
                        market,
                        askOrder
                )
        );

        try {
            String orderTx = rpcClient.getApi().sendTransaction(placeTx, mmAccount);
            log.info("Base Ask: " + askOrder.getFloatQuantity() + " @ " + askOrder.getFloatPrice() + ", " + orderTx);
            lastAskOrder = askOrder;
        } catch (RpcException e) {
            log.error("OrderTx Error = " + e.getMessage());
        }
    }

    private void placeUsdcBid(float amount, float price, boolean cancel) {
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
                        market,
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

        serumManager.setOrderPrices(bidOrder, market);

        if (cancel) {
            placeTx.addInstruction(
                    SerumProgram.cancelOrderByClientId(
                            market,
                            marketOoa,
                            mmAccount.getPublicKey(),
                            BID_CLIENT_ID
                    )
            );
        }


        // Settle - base wallet gets created first then closed after
        placeTx.addInstruction(
                SerumProgram.settleFunds(
                        market,
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
                        market,
                        bidOrder
                )
        );

        try {
            String orderTx = rpcClient.getApi().sendTransaction(placeTx, mmAccount);
            log.info("Quote Bid: " + bidOrder.getFloatQuantity() + " @ " + bidOrder.getFloatPrice() + ", " + orderTx);
            lastBidOrder = bidOrder;
        } catch (RpcException e) {
            log.error("OrderTx Error = " + e.getMessage());
        }
    }

    @Override
    public void stop() {
        // CXL open orders
        log.info("Stopping bot on market {} and settling orders...", market.getOwnAddress().toBase58());
        executorService.shutdown();
        hardCancelAndSettle();
        log.info("Bot stopped on market {}.", market.getOwnAddress().toBase58());
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
                        market,
                        marketOoa,
                        account.getPublicKey(),
                        ASK_CLIENT_ID
                )
        );

        newTx.addInstruction(
                SerumProgram.settleFunds(
                        market,
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
            log.info("Settled asks on market {}", market.getOwnAddress().toBase58());
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
                        market,
                        marketOoa,
                        account.getPublicKey(),
                        BID_CLIENT_ID
                )
        );

        newTx2.addInstruction(
                SerumProgram.settleFunds(
                        market,
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
            log.info("Settled bids on market {}", market.getOwnAddress().toBase58());
        } catch (RpcException e) {
            log.error(e.getMessage());
        }
    }
}
