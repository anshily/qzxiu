package io.peach.launch.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "qzx_goods_message")
public class GoodsMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 商品名称
     */
    private String goodsname;

    /**
     * 商品价格
     */
    private Float goodsprice;

    /**
     * 商品图片
     */
    private String goodspicture;

    /**
     * 商品信息描述
     */
    private String represent;

    private Date createtime;

    private Date updatetime;

    /**
     * 商品状态（1：可用，2：不可用）
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
     * 获取商品名称
     *
     * @return goodsname - 商品名称
     */
    public String getGoodsname() {
        return goodsname;
    }

    /**
     * 设置商品名称
     *
     * @param goodsname 商品名称
     */
    public void setGoodsname(String goodsname) {
        this.goodsname = goodsname;
    }

    /**
     * 获取商品价格
     *
     * @return goodsprice - 商品价格
     */
    public Float getGoodsprice() {
        return goodsprice;
    }

    /**
     * 设置商品价格
     *
     * @param goodsprice 商品价格
     */
    public void setGoodsprice(Float goodsprice) {
        this.goodsprice = goodsprice;
    }

    /**
     * 获取商品图片
     *
     * @return goodspicture - 商品图片
     */
    public String getGoodspicture() {
        return goodspicture;
    }

    /**
     * 设置商品图片
     *
     * @param goodspicture 商品图片
     */
    public void setGoodspicture(String goodspicture) {
        this.goodspicture = goodspicture;
    }

    /**
     * 获取商品信息描述
     *
     * @return represent - 商品信息描述
     */
    public String getRepresent() {
        return represent;
    }

    /**
     * 设置商品信息描述
     *
     * @param represent 商品信息描述
     */
    public void setRepresent(String represent) {
        this.represent = represent;
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
     * 获取商品状态（1：可用，2：不可用）
     *
     * @return statu - 商品状态（1：可用，2：不可用）
     */
    public Integer getStatu() {
        return statu;
    }

    /**
     * 设置商品状态（1：可用，2：不可用）
     *
     * @param statu 商品状态（1：可用，2：不可用）
     */
    public void setStatu(Integer statu) {
        this.statu = statu;
    }
}