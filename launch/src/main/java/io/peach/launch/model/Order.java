package io.peach.launch.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "qzx_order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 店铺id
     */
    private Integer shopid;

    /**
     * 订单中商品的总数量
     */
    private Integer goodsnum;

    /**
     * 商品的总价值
     */
    private Float priceAll;

    private Date createtime;

    private Date updatetime;

    /**
     * 订单状态（0：订单取消，1：订单审核中，2：订单已完成）
     */
    private Integer statu;

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
     * 获取店铺id
     *
     * @return shopid - 店铺id
     */
    public Integer getShopid() {
        return shopid;
    }

    /**
     * 设置店铺id
     *
     * @param shopid 店铺id
     */
    public void setShopid(Integer shopid) {
        this.shopid = shopid;
    }

    /**
     * 获取订单中商品的总数量
     *
     * @return goodsnum - 订单中商品的总数量
     */
    public Integer getGoodsnum() {
        return goodsnum;
    }

    /**
     * 设置订单中商品的总数量
     *
     * @param goodsnum 订单中商品的总数量
     */
    public void setGoodsnum(Integer goodsnum) {
        this.goodsnum = goodsnum;
    }

    /**
     * 获取商品的总价值
     *
     * @return priceAll - 商品的总价值
     */
    public Float getPriceAll() {
        return priceAll;
    }

    /**
     * 设置商品的总价值
     *
     * @param priceAll 商品的总价值
     */
    public void setPriceAll(Float priceAll) {
        this.priceAll = priceAll;
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
     * 获取订单状态（0：订单取消，1：订单审核中，2：订单已完成）
     *
     * @return statu - 订单状态（0：订单取消，1：订单审核中，2：订单已完成）
     */
    public Integer getStatu() {
        return statu;
    }

    /**
     * 设置订单状态（0：订单取消，1：订单审核中，2：订单已完成）
     *
     * @param statu 订单状态（0：订单取消，1：订单审核中，2：订单已完成）
     */
    public void setStatu(Integer statu) {
        this.statu = statu;
    }
}