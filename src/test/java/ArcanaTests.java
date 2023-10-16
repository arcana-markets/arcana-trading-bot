import com.mmorrell.serum.model.OpenOrdersAccount;
import com.mmorrell.serum.model.SerumUtils;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.p2p.solanaj.core.PublicKey;
import org.p2p.solanaj.rpc.Cluster;
import org.p2p.solanaj.rpc.RpcClient;
import org.p2p.solanaj.rpc.RpcException;
import org.p2p.solanaj.rpc.types.TokenAccountInfo;

import java.util.HashMap;
import java.util.Map;

@Slf4j
public class ArcanaTests {

    private final RpcClient rpcClient = new RpcClient(Cluster.BLOCKDAEMON);

    @Test
    public void ooaApiTest() throws RpcException {
        Map<String, Object> requiredParams = Map.of("mint", new PublicKey("J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn"));
        TokenAccountInfo tokenAccount = rpcClient.getApi().getTokenAccountsByOwner(PublicKey.valueOf(
                "mikefsWLEcNYHgsiwSRr6PVd7yVcoKeaURQqeDE1tXN"), requiredParams, new HashMap<>());

        log.info(tokenAccount.toString());

        PublicKey jitoSolMarket = new PublicKey("JAmhJbmBzLp2aTp9mNJodPsTcpCJsmq5jpr6CuCbWHvR");

        final OpenOrdersAccount openOrdersAccount = SerumUtils.findOpenOrdersAccountForOwner(
                rpcClient,
                jitoSolMarket,
                PublicKey.valueOf("mikefsWLEcNYHgsiwSRr6PVd7yVcoKeaURQqeDE1tXN")
        );

        log.info("OOA: " + openOrdersAccount.getOwnPubkey().toBase58());
    }

    @Test
    public void cacheTokenAccountsTest() throws RpcException {
        Map<String, Object> requiredParams = Map.of("programId", new PublicKey(
                "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"));
        TokenAccountInfo tokenAccount = rpcClient.getApi().getTokenAccountsByOwner(PublicKey.valueOf(
                "mikefsWLEcNYHgsiwSRr6PVd7yVcoKeaURQqeDE1tXN"), requiredParams, new HashMap<>());

        log.info(tokenAccount.toString());
    }
}
