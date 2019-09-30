package io.peach.launch.dto;

import java.math.BigDecimal;

/**
 * Created by ASUS on 2019/9/30.
 */
public class CashOutDTO {
    private Integer shopid;
    private BigDecimal money;
    private String image;

    public Integer getShopid() {
        return shopid;
    }

    public void setShopid(Integer shopid) {
        this.shopid = shopid;
    }

    public BigDecimal getMoney() {
        return money;
    }

    public void setMoney(BigDecimal money) {
        this.money = money;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
