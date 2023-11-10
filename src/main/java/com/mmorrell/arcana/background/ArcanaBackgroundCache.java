package com.mmorrell.arcana.background;

import com.mmorrell.serum.model.Market;
import com.mmorrell.serum.model.SerumUtils;
import com.mmorrell.serum.program.SerumProgram;
import lombok.extern.slf4j.Slf4j;
import org.p2p.solanaj.core.Account;
import org.p2p.solanaj.core.PublicKey;
import org.p2p.solanaj.core.Transaction;
import org.p2p.solanaj.programs.ComputeBudgetProgram;
import org.p2p.solanaj.programs.SystemProgram;
import org.p2p.solanaj.programs.TokenProgram;
import org.p2p.solanaj.rpc.RpcClient;
import org.p2p.solanaj.rpc.RpcException;
import org.p2p.solanaj.rpc.types.ProgramAccount;
import org.p2p.solanaj.rpc.types.TokenAccountInfo;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
@Slf4j
public class ArcanaBackgroundCache {

    private RpcClient rpcClient;

    public ArcanaBackgroundCache(RpcClient rpcClient) {
        this.rpcClient = rpcClient;
        this.cachedMarkets = new ArrayList<>();
    }

    private List<Market> cachedMarkets;

    // Caches: List of all markets, ...
    public List<Market> getCachedMarkets() {
        if (cachedMarkets.isEmpty()) {
            backgroundCacheMarkets();
        }

        return cachedMarkets;
    }

    public void backgroundCacheMarkets() {
        final List<ProgramAccount> programAccounts;
        try {
            programAccounts = new ArrayList<>(
                    rpcClient.getApi().getProgramAccounts(
                            new PublicKey("srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX"),
                            Collections.emptyList(),
                            SerumUtils.MARKET_ACCOUNT_SIZE
                    )
            );
        } catch (RpcException e) {
            throw new RuntimeException(e);
        }

        cachedMarkets.clear();
        for (ProgramAccount programAccount : programAccounts) {
            Market market = Market.readMarket(programAccount.getAccount().getDecodedData());

            // Ignore fake/erroneous market accounts
            if (market.getOwnAddress().equals(new PublicKey("11111111111111111111111111111111"))) {
                continue;
            }

            cachedMarkets.add(market);
        }
    }

    public Optional<TokenAccountInfo> getTokenCache(PublicKey owner) {
        Map<String, Object> requiredParams = Map.of("programId", new PublicKey(
                "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"));
        try {
            TokenAccountInfo tokenAccount = rpcClient.getApi().getTokenAccountsByOwner(owner, requiredParams,
                    new HashMap<>());
            return Optional.of(tokenAccount);
        } catch (RpcException e) {
            return Optional.empty();
        }
    }

    public PublicKey wrapSol(Account tradingAccount, Double solAmount) {
        Account sessionWsolAccount = new Account();
        Transaction newTx = new Transaction();
        newTx.addInstruction(
                ComputeBudgetProgram.setComputeUnitPrice(
                        500_000
                )
        );
        newTx.addInstruction(
                ComputeBudgetProgram.setComputeUnitLimit(
                        14_700
                )
        );
        double startingAmount = solAmount;
        newTx.addInstruction(
                SystemProgram.createAccount(
                        tradingAccount.getPublicKey(),
                        sessionWsolAccount.getPublicKey(),
                        (long) (startingAmount * 1000000000.0) + 3039280, //.03 SOL
                        165,
                        TokenProgram.PROGRAM_ID
                )
        );
        newTx.addInstruction(
                TokenProgram.initializeAccount(
                        sessionWsolAccount.getPublicKey(),
                        SerumUtils.WRAPPED_SOL_MINT,
                        tradingAccount.getPublicKey()
                )
        );

        try {
            String txId = rpcClient.getApi().sendTransaction(newTx, List.of(tradingAccount, sessionWsolAccount), null);
            log.info("Wrap SOL: " + txId + ", " + solAmount);
        } catch (RpcException e) {
            log.error(e.getMessage());
            return PublicKey.valueOf("");
        }

        return sessionWsolAccount.getPublicKey();
    }

    public PublicKey generateOoa(Account tradingAccount, PublicKey marketId) {
        Account newOoa = new Account();
        Transaction tx = new Transaction();
        tx.addInstruction(
                ComputeBudgetProgram.setComputeUnitPrice(
                        500_000
                )
        );
        tx.addInstruction(
                ComputeBudgetProgram.setComputeUnitLimit(
                        13_700
                )
        );
        tx.addInstruction(
                SystemProgram.createAccount(
                        tradingAccount.getPublicKey(),
                        newOoa.getPublicKey(),
                        24003928L,
                        3228,
                        new PublicKey("srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX")
                )
        );
        tx.addInstruction(
                SerumProgram.initOpenOrders(
                        newOoa.getPublicKey(),
                        tradingAccount.getPublicKey(),
                        marketId
                )
        );

        try {
            String txId = rpcClient.getApi().sendTransaction(tx, List.of(tradingAccount, newOoa), null);
            log.info("Generate OOA: " + txId);
        } catch (RpcException e) {
            log.error("Unable to generate OOA: " + e.getMessage());
        }

        return newOoa.getPublicKey();
    }
}
