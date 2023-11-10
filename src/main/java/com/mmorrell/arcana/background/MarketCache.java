package com.mmorrell.arcana.background;

import com.mmorrell.serum.model.Market;
import lombok.extern.slf4j.Slf4j;
import org.p2p.solanaj.core.PublicKey;
import org.p2p.solanaj.rpc.RpcClient;
import org.p2p.solanaj.rpc.RpcException;
import org.p2p.solanaj.rpc.types.AccountInfo;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
@Slf4j
public class MarketCache {

    private RpcClient rpcClient;
    private final Map<PublicKey, Market> marketCache = new HashMap<>();

    public MarketCache(RpcClient rpcClient) {
        this.rpcClient = rpcClient;
    }

    public void setRpcClient(RpcClient rpcClient) {
        this.rpcClient = rpcClient;
    }

    public Optional<Market> getMarket(PublicKey marketId) {
        if (marketCache.containsKey(marketId)) {
            return Optional.of(marketCache.get(marketId));
        }
        AccountInfo accountInfo;
        try {
            accountInfo = rpcClient.getApi().getAccountInfo(marketId);
        } catch (RpcException e) {
            log.error(e.getLocalizedMessage());
            return Optional.empty();
        }

        Market market = Market.readMarket(accountInfo.getDecodedData());
        marketCache.put(marketId, market);
        return Optional.of(market);
    }
}
