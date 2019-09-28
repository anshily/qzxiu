package io.peach.launch.dto;

import io.peach.launch.model.GoodsMessage;

import java.util.List;

/**
 * Created by ASUS on 2019/9/25.
 */
public class ShopCar {
    private List<GoodsMessageDTO> list;
    private Integer shopId;

    public Integer getShopId() {
        return shopId;
    }

    public void setShopId(Integer shopId) {
        this.shopId = shopId;
    }

    public List<GoodsMessageDTO> getList() {
        return list;
    }

    public void setList(List<GoodsMessageDTO> list) {
        this.list = list;
    }
}
