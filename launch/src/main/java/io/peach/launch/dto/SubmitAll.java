package io.peach.launch.dto;

import io.peach.launch.model.ShopMessage;
import io.peach.launch.model.User;

/**
 * Created by ASUS on 2019/9/18.
 */
public class SubmitAll {
    private User user;
    private ShopMessage shopMessage;
    private Integer recommendID;
    private Integer positionID;
    private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ShopMessage getShopMessage() {
        return shopMessage;
    }

    public void setShopMessage(ShopMessage shopMessage) {
        this.shopMessage = shopMessage;
    }

    public Integer getRecommendID() {
        return recommendID;
    }

    public void setRecommendID(Integer recommendID) {
        this.recommendID = recommendID;
    }

    public Integer getPositionID() {
        return positionID;
    }

    public void setPositionID(Integer positionID) {
        this.positionID = positionID;
    }
}
