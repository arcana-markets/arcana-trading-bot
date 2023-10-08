package com.mmorrell.arcana.background;

import com.mmorrell.serum.model.Market;
import com.mmorrell.serum.model.SerumUtils;
import org.p2p.solanaj.core.PublicKey;
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
}
