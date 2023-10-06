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

    private final RpcClient rpcClient;

    public MarketCache(RpcClient rpcClient) {
        this.rpcClient = rpcClient;
    }


    // Each market is only loaded once
    private final Map<PublicKey, Market> marketMap = new HashMap<>();


    public Optional<Market> getMarket(PublicKey marketId) {
        //Market market = Market.readMarket(programAccount.getAccount().getDecodedData());
        AccountInfo accountInfo;
        try {
            accountInfo = rpcClient.getApi().getAccountInfo(marketId);
        } catch (RpcException e) {
            log.error(e.getLocalizedMessage());
            return Optional.empty();
        }

        Market market = Market.readMarket(accountInfo.getDecodedData());
        return Optional.of(market);
    }
}
