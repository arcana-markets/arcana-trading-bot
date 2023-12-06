package com.mmorrell.arcana.strategies;

import lombok.Data;
import org.p2p.solanaj.core.PublicKey;

@Data
public class OpenBookBot {

    private Strategy strategy;
    private String dex = "openbook";
    private PublicKey marketId;
    private double bpsSpread = 20.0;
    private double amountBid = 0.1, amountAsk = 0.1;

    private PublicKey ooa;
    private PublicKey baseWallet;
    private PublicKey quoteWallet;

    private String priceStrategy = "jupiter";

    // marketId, bps spread, amount to bid, amount to ask
    // ooa pubkey, base wallet pubkey, quote pubkey

}
