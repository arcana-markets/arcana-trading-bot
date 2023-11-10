import com.mmorrell.arcana.util.MarketUtil;
import com.mmorrell.serum.model.OpenOrdersAccount;
import com.mmorrell.serum.model.SerumUtils;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.p2p.solanaj.core.Account;
import org.p2p.solanaj.core.AccountMeta;
import org.p2p.solanaj.core.PublicKey;
import org.p2p.solanaj.core.Transaction;
import org.p2p.solanaj.core.TransactionInstruction;
import org.p2p.solanaj.programs.ComputeBudgetProgram;
import org.p2p.solanaj.programs.SystemProgram;
import org.p2p.solanaj.rpc.Cluster;
import org.p2p.solanaj.rpc.RpcClient;
import org.p2p.solanaj.rpc.RpcException;
import org.p2p.solanaj.rpc.types.TokenAccountInfo;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.p2p.solanaj.programs.Program.createTransactionInstruction;

@Slf4j
public class ArcanaTests {

    private final RpcClient rpcClient = new RpcClient(Cluster.MAINNET);

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

    @Test
    public void balanceTest() throws RpcException {
        TokenAccountInfo usdcBalance =
                rpcClient.getApi().getTokenAccountsByOwner(PublicKey.valueOf(
                                "mikefsWLEcNYHgsiwSRr6PVd7yVcoKeaURQqeDE1tXN"),
                        Map.of("mint", MarketUtil.USDC_MINT.toBase58()), Map.of());
        log.info(usdcBalance.toString());

        String uiAmount = usdcBalance.getValue().get(0).getAccount().getData().getParsed().getInfo().getTokenAmount().getUiAmountString();
        log.info("USDC Balance: {}", uiAmount);
    }

    @Test
    public void createOoaTest() throws RpcException {
        Account tradingAccount = new Account(); // use a real account with Account.fromJson
        log.info("Trading account {}", tradingAccount.getPublicKey().toBase58());

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
        tx.addInstruction(initOpenOrders(
                newOoa.getPublicKey(),
                tradingAccount.getPublicKey(),
                new PublicKey("ARjaHVxGCQfTvvKjLd7U7srvk6orthZSE6uqWchCczZc")
        ));

        try {
            String txId = rpcClient.getApi().sendTransaction(tx, List.of(tradingAccount, newOoa), null);
            log.info("Generate OOA: " + txId);
        } catch (RpcException e) {
            log.error("Unable to generate OOA: " + e.getMessage());
        }

        log.info("New OOA: {}", newOoa.getPublicKey().toBase58());
    }

    public static TransactionInstruction initOpenOrders(PublicKey ooa,
                                                        PublicKey ownerSigner,
                                                        PublicKey market) {
        List<AccountMeta> accountMetas = new ArrayList<>();

        accountMetas.add(new AccountMeta(ooa, false, true));
        accountMetas.add(new AccountMeta(ownerSigner, true, false));
        accountMetas.add(new AccountMeta(market, false, false));
        accountMetas.add(new AccountMeta(new PublicKey("SysvarRent111111111111111111111111111111111"), false, false));


        ByteBuffer result = ByteBuffer.allocate(5);
        result.order(ByteOrder.LITTLE_ENDIAN);

        result.put(1, (byte) 15);

        byte[] transactionData = result.array();
        return createTransactionInstruction(
                SerumUtils.SERUM_PROGRAM_ID_V3,
                accountMetas,
                transactionData
        );
    }
}
