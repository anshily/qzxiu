package io.peach.launch.dto;

/**
 * Created by ASUS on 2019/10/10.
 */
public class ChangeGradingDTO {
    private Integer waitShopid;
    private String changeType;
    private Integer targetShopid;

    public Integer getTargetShopid() {
        return targetShopid;
    }

    public void setTargetShopid(Integer targetShopid) {
        this.targetShopid = targetShopid;
    }

    public Integer getWaitShopid() {
        return waitShopid;
    }

    public void setWaitShopid(Integer waitShopid) {
        this.waitShopid = waitShopid;
    }

    public String getChangeType() {
        return changeType;
    }

    public void setChangeType(String changeType) {
        this.changeType = changeType;
    }
}
