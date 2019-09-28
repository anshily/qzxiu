package io.peach.launch.dto;

import java.math.BigDecimal;

/**
 * Created by ASUS on 2019/9/26.
 */
public class GoodsMessageDTO {
    private Integer goodsId;
    private Integer goodsNum;
    private BigDecimal goodsPrice;

    public Integer getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Integer goodsId) {
        this.goodsId = goodsId;
    }

    public Integer getGoodsNum() {
        return goodsNum;
    }

    public void setGoodsNum(Integer goodsNum) {
        this.goodsNum = goodsNum;
    }

    public BigDecimal getGoodsPrice() {
        return goodsPrice;
    }

    public void setGoodsPrice(BigDecimal goodsPrice) {
        this.goodsPrice = goodsPrice;
    }
}
