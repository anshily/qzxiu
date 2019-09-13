package io.peach.launch.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "qzx_grading")
public class Grading {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 店铺id
     */
    private Integer shopid;

    /**
     * 上级店铺的id
     */
    private Integer f_shopid;

    /**
     * 返点类型（地区，推荐人）
     */
    private String point_type;

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
     * 获取上级店铺的id
     *
     * @return f_shopid - 上级店铺的id
     */
    public Integer getF_shopid() {
        return f_shopid;
    }

    /**
     * 设置上级店铺的id
     *
     * @param f_shopid 上级店铺的id
     */
    public void setF_shopid(Integer f_shopid) {
        this.f_shopid = f_shopid;
    }

    /**
     * 获取返点类型（地区，推荐人）
     *
     * @return point_type - 返点类型（地区，推荐人）
     */
    public String getPoint_type() {
        return point_type;
    }

    /**
     * 设置返点类型（地区，推荐人）
     *
     * @param point_type 返点类型（地区，推荐人）
     */
    public void setPoint_type(String point_type) {
        this.point_type = point_type;
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