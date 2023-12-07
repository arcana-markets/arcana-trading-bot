package com.mmorrell.arcana.util;

import com.mmorrell.model.OpenBookOrder;
import com.mmorrell.serum.model.OrderBook;
import org.p2p.solanaj.core.PublicKey;

import java.util.List;
import java.util.stream.Collectors;

public class MarketUtil {

    // For initial market caching
    public static final PublicKey USDC_MINT =
            PublicKey.valueOf("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
    public static final PublicKey USDT_MINT =
            PublicKey.valueOf("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB");
    public static final PublicKey WBTC_MINT =
            PublicKey.valueOf("3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh");

    public static List<OpenBookOrder> convertOrderBookToSerumOrders(OrderBook orderBook, boolean isBid) {
        return orderBook.getOrders().stream()
                .map(order -> {
                    OpenBookOrder serumOrder = new OpenBookOrder();
                    serumOrder.setPrice(order.getFloatPrice());
                    serumOrder.setQuantity(order.getFloatQuantity());
                    serumOrder.setOwner(order.getOwner());
                    return serumOrder;
                })
                .sorted((o1, o2) -> {
                    if (isBid) {
                        return Float.compare(o2.getPrice(), o1.getPrice());
                    }
                    return Float.compare(o1.getPrice(), o2.getPrice());
                })
                .collect(Collectors.toList());
    }

    public static String convertPhoenixOrderToString(double price, double size) {
        return String.format("%.4f x %.4f", price, size);
    }

}
