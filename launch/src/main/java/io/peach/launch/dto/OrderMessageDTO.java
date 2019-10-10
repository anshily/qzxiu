package io.peach.launch.dto;

import io.peach.launch.model.GoodsMessage;

/**
 * Created by ASUS on 2019/10/9.
 */
public class OrderMessageDTO {
    private GoodsMessage goodsMessage;
    private Integer quantity;

    public GoodsMessage getGoodsMessage() {
        return goodsMessage;
    }

    public void setGoodsMessage(GoodsMessage goodsMessage) {
        this.goodsMessage = goodsMessage;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
