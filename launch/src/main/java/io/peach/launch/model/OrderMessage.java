package io.peach.launch.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "qzx_order_message")
public class OrderMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 对应的订单id
     */
    private String orderid;

    /**
     * 对应的商品id
     */
    private Integer goodsid;

    /**
     * 商品的数量
     */
    private Integer quantity;

    private Date createtime;

    private Date updatetime;

    /**
     * 状态（1：可用，0：不可用）
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
     * 获取对应的订单id
     *
     * @return orderid - 对应的订单id
     */
    public String getOrderid() {
        return orderid;
    }

    public void setOrderid(String orderid) {
        this.orderid = orderid;
    }

    /**
     * 获取对应的商品id
     *
     * @return goodsid - 对应的商品id
     */
    public Integer getGoodsid() {
        return goodsid;
    }

    /**
     * 设置对应的商品id
     *
     * @param goodsid 对应的商品id
     */
    public void setGoodsid(Integer goodsid) {
        this.goodsid = goodsid;
    }

    /**
     * 获取商品的数量
     *
     * @return quantity - 商品的数量
     */
    public Integer getQuantity() {
        return quantity;
    }

    /**
     * 设置商品的数量
     *
     * @param quantity 商品的数量
     */
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
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
     * 获取状态（1：可用，0：不可用）
     *
     * @return statu - 状态（1：可用，0：不可用）
     */
    public Integer getStatu() {
        return statu;
    }

    /**
     * 设置状态（1：可用，0：不可用）
     *
     * @param statu 状态（1：可用，0：不可用）
     */
    public void setStatu(Integer statu) {
        this.statu = statu;
    }
}