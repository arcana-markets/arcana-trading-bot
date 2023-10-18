package com.mmorrell.arcana.background;

import com.mmorrell.serum.model.Market;
import com.mmorrell.serum.model.MarketBuilder;
import com.mmorrell.serum.model.SerumUtils;
import org.p2p.solanaj.core.AccountMeta;
import org.p2p.solanaj.core.PublicKey;
import org.p2p.solanaj.core.TransactionInstruction;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.ArrayList;
import java.util.List;

import static org.p2p.solanaj.programs.Program.createTransactionInstruction;

public class OpenBookProgramUtils {

    public static TransactionInstruction initOpenOrders(PublicKey ooa,
                                                        PublicKey ownerSigner,
                                                        PublicKey market) {
        List<AccountMeta> accountMetas = new ArrayList<>();

        accountMetas.add(new AccountMeta(ooa, false, true));
        accountMetas.add(new AccountMeta(ownerSigner, true, false));
        accountMetas.add(new AccountMeta(market, false, false));


        ByteBuffer result = ByteBuffer.allocate(1);
        result.order(ByteOrder.LITTLE_ENDIAN);

        result.put(0, (byte) 16);

        byte[] transactionData = result.array();
        return createTransactionInstruction(
                SerumUtils.SERUM_PROGRAM_ID_V3,
                accountMetas,
                transactionData
        );
    }


}
