package com.mmorrell.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mmorrell.arcana.util.PublicKeySerializer;
import lombok.Builder;
import lombok.Data;
import org.p2p.solanaj.core.PublicKey;

@Data
@Builder
public class PhoenixNormalizedOrder {

    private double price;
    private double quantity;

    @JsonSerialize(using = PublicKeySerializer.class)
    private PublicKey owner;
}
