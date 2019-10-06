package io.peach.launch.dto;

import io.peach.launch.model.GoodsMessage;

/**
 * Created by ASUS on 2019/10/6.
 */
public class GoodsMessageTokenDTO {
    private GoodsMessage goodsMessage;
    private String token;

    public GoodsMessage getGoodsMessage() {
        return goodsMessage;
    }

    public void setGoodsMessage(GoodsMessage goodsMessage) {
        this.goodsMessage = goodsMessage;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
