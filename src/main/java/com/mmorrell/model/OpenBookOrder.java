package com.mmorrell.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mmorrell.arcana.util.PublicKeySerializer;
import lombok.Data;
import org.p2p.solanaj.core.PublicKey;

import java.util.HashMap;
import java.util.Map;

// For easy serialization of Order class, without baggage
@Data
public class OpenBookOrder {
    private float price;
    private float quantity;

    // Possible keys: "entityName", "entityIcon" (for the known entity)
    private final Map<String, Object> metadata = new HashMap<>();

    @JsonSerialize(using = PublicKeySerializer.class)
    private PublicKey owner;

    public void addMetadata(String key, Object value) {
        metadata.put(key, value);
    }
}
