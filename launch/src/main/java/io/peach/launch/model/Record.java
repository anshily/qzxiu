package io.peach.launch.model;

import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.*;

@Table(name = "qzx_record")
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 店铺id（标明哪个店铺的消息）
     */
    private Integer shopid;

    /**
     * 消息类型（普通消息或者佣金消息）
     */
    private String type;

    /**
     * 消息来源的店铺id（普通消息默认为0）
     */
    private Integer sourceid;

    /**
     * 金额
     */
    private BigDecimal money;

    private Date createtime;

    private Date updatetime;

    /**
     * 消息状态（0：不可用，1：未读，2：已读）
     */
    private Integer statu;

    /**
     * 信息描述
     */
    private String subscribe;
    private String image;

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    /**
     * @return id
     */


    public Integer getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取店铺id（标明哪个店铺的消息）
     *
     * @return shopid - 店铺id（标明哪个店铺的消息）
     */
    public Integer getShopid() {
        return shopid;
    }

    /**
     * 设置店铺id（标明哪个店铺的消息）
     *
     * @param shopid 店铺id（标明哪个店铺的消息）
     */
    public void setShopid(Integer shopid) {
        this.shopid = shopid;
    }

    /**
     * 获取消息类型（普通消息或者佣金消息）
     *
     * @return type - 消息类型（普通消息或者佣金消息）
     */
    public String getType() {
        return type;
    }

    /**
     * 设置消息类型（普通消息或者佣金消息）
     *
     * @param type 消息类型（普通消息或者佣金消息）
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * 获取消息来源的店铺id（普通消息默认为0）
     *
     * @return sourceid - 消息来源的店铺id（普通消息默认为0）
     */
    public Integer getSourceid() {
        return sourceid;
    }

    /**
     * 设置消息来源的店铺id（普通消息默认为0）
     *
     * @param sourceid 消息来源的店铺id（普通消息默认为0）
     */
    public void setSourceid(Integer sourceid) {
        this.sourceid = sourceid;
    }

    /**
     * 获取金额
     *
     * @return money - 金额
     */
    public BigDecimal getMoney() {
        return money;
    }

    /**
     * 设置金额
     *
     * @param money 金额
     */
    public void setMoney(BigDecimal money) {
        this.money = money;
    }

    /**
     * @return createtime
     */
    public Date getCreatetime() {
        return createtime;
    }

    /**
     * @param createtime
     */
    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    /**
     * @return updatetime
     */
    public Date getUpdatetime() {
        return updatetime;
    }

    /**
     * @param updatetime
     */
    public void setUpdatetime(Date updatetime) {
        this.updatetime = updatetime;
    }

    /**
     * 获取消息状态（0：不可用，1：未读，2：已读）
     *
     * @return statu - 消息状态（0：不可用，1：未读，2：已读）
     */
    public Integer getStatu() {
        return statu;
    }

    /**
     * 设置消息状态（0：不可用，1：未读，2：已读）
     *
     * @param statu 消息状态（0：不可用，1：未读，2：已读）
     */
    public void setStatu(Integer statu) {
        this.statu = statu;
    }

    /**
     * 获取信息描述
     *
     * @return subscribe - 信息描述
     */
    public String getSubscribe() {
        return subscribe;
    }

    /**
     * 设置信息描述
     *
     * @param subscribe 信息描述
     */
    public void setSubscribe(String subscribe) {
        this.subscribe = subscribe;
    }
}