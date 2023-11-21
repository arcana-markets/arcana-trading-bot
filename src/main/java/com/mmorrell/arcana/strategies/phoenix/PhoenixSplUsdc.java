package com.mmorrell.arcana.strategies.phoenix;

import com.mmorrell.arcana.pricing.JupiterPricingSource;
import com.mmorrell.arcana.strategies.Strategy;
import com.mmorrell.phoenix.model.LimitOrderPacketRecord;
import com.mmorrell.phoenix.model.PhoenixMarket;
import com.mmorrell.phoenix.program.PhoenixProgram;
import com.mmorrell.phoenix.program.PhoenixSeatManagerProgram;
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
import java.util.Map;
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
                            this.bestBidPrice =
                                    (double) market.getBestBid().getFirst().getPriceInTicks() / market.getBaseLotsPerBaseUnit();
                            this.bestAskPrice =
                                    (double) market.getBestAsk().getFirst().getPriceInTicks() / market.getBaseLotsPerBaseUnit();
                        }

                        log.info("Best bid: {}, Best Ask: {}", bestBidPrice, bestAskPrice);

                        // Main loop
                        LimitOrderPacketRecord limitOrderPacketRecord = LimitOrderPacketRecord.builder()
                                .clientOrderId(new byte[]{})
                                .matchLimit(0)
                                .numBaseLots(18L)
                                .priceInTicks((long) (market.getBestBid().getFirst().getPriceInTicks() * .9995))
                                .selfTradeBehavior((byte) 1)
                                .side((byte) 0)
                                .useOnlyDepositedFunds(false)
                                .build();

                        LimitOrderPacketRecord limitOrderPacketRecordAsk = LimitOrderPacketRecord.builder()
                                .clientOrderId(new byte[]{})
                                .matchLimit(0)
                                .numBaseLots(18L)
                                .priceInTicks((long) (market.getBestAsk().getFirst().getPriceInTicks() * 1.0005))
                                .selfTradeBehavior((byte) 1)
                                .side((byte) 1)
                                .useOnlyDepositedFunds(false)
                                .build();

//                        Transaction limitOrderTx = new Transaction();
//                        limitOrderTx.addInstruction(
//                                ComputeBudgetProgram.setComputeUnitPrice(
//                                        123
//                                )
//                        );
//
//                        limitOrderTx.addInstruction(
//                                ComputeBudgetProgram.setComputeUnitLimit(
//                                        130_000
//                                )
//                        );
//                        limitOrderTx.addInstruction(
//                                PhoenixSeatManagerProgram.claimSeat(
//                                        marketId,
//                                        SOL_USDC_SEAT_MANAGER,
//                                        SOL_USDC_SEAT_DEPOSIT_COLLECTOR,
//                                        tradingAccount.getPublicKey(),
//                                        tradingAccount.getPublicKey()
//                                )
//                        );
//
//                        limitOrderTx.addInstruction(
//                                PhoenixProgram.cancelAllOrders(
//                                        SOL_USDC_MARKET,
//                                        tradingAccount.getPublicKey(),
//                                        new PublicKey("Avs5RSYyecvLnt9iFYNQX5EMUun3egh3UNPw8P6ULbNS"),
//                                        new PublicKey("A6Jcj1XV6QqDpdimmL7jm1gQtSP62j8BWbyqkdhe4eLe"),
//                                        market.getPhoenixMarketHeader().getBaseVaultKey(),
//                                        market.getPhoenixMarketHeader().getQuoteVaultKey()
//                                )
//                        );
//
//                        limitOrderTx.addInstruction(
//                                PhoenixProgram.placeLimitOrder(
//                                        SOL_USDC_MARKET,
//                                        tradingAccount.getPublicKey(),
//                                        seatPda,
//                                        new PublicKey("Avs5RSYyecvLnt9iFYNQX5EMUun3egh3UNPw8P6ULbNS"),
//                                        new PublicKey("A6Jcj1XV6QqDpdimmL7jm1gQtSP62j8BWbyqkdhe4eLe"),
//                                        market.getPhoenixMarketHeader().getBaseVaultKey(),
//                                        market.getPhoenixMarketHeader().getQuoteVaultKey(),
//                                        limitOrderPacketRecord
//                                )
//                        );
//
//                        limitOrderTx.addInstruction(
//                                PhoenixProgram.placeLimitOrder(
//                                        SOL_USDC_MARKET,
//                                        tradingAccount.getPublicKey(),
//                                        seatPda,
//                                        new PublicKey("Avs5RSYyecvLnt9iFYNQX5EMUun3egh3UNPw8P6ULbNS"),
//                                        new PublicKey("A6Jcj1XV6QqDpdimmL7jm1gQtSP62j8BWbyqkdhe4eLe"),
//                                        market.getPhoenixMarketHeader().getBaseVaultKey(),
//                                        market.getPhoenixMarketHeader().getQuoteVaultKey(),
//                                        limitOrderPacketRecordAsk
//                                )
//                        );
//
//                        String placeLimitOrderTx = client.getApi().sendTransaction(
//                                limitOrderTx,
//                                List.of(tradingAccount),
//                                client.getApi().getRecentBlockhash(Commitment.PROCESSED)
//                        );
//                        log.info("Limit order in transaction: {}, {}",  limitOrderPacketRecord, placeLimitOrderTx);


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

    @Override
    public void stop() {
        // CXL open orders
        log.info("Stopping bot on market {} and settling orders...", marketId.toBase58());
        executorService.shutdown();
        log.info("Bot stopped on market {}.", marketId.toBase58());
    }
}
