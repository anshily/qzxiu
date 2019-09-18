package io.peach.launch.model;

import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.*;

@Table(name = "qzx_shop_type")
public class ShopType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 店铺类型名称（例如：市级代理）
     */
    private String typename;

    /**
     * 代理费用
     */
    private BigDecimal agencycost;

    private Date createtime;

    private Date updatetime;

    /**
     * 状态（1：可用，2：不可用）
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
     * 获取店铺类型名称（例如：市级代理）
     *
     * @return typename - 店铺类型名称（例如：市级代理）
     */
    public String getTypename() {
        return typename;
    }

    /**
     * 设置店铺类型名称（例如：市级代理）
     *
     * @param typename 店铺类型名称（例如：市级代理）
     */
    public void setTypename(String typename) {
        this.typename = typename;
    }

    /**
     * 获取代理费用
     *
     * @return agencycost - 代理费用
     */
    public BigDecimal getAgencycost() {
        return agencycost;
    }

    public void setAgencycost(BigDecimal agencycost) {
        this.agencycost = agencycost;
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
     * 获取状态（1：可用，2：不可用）
     *
     * @return statu - 状态（1：可用，2：不可用）
     */
    public Integer getStatu() {
        return statu;
    }

    /**
     * 设置状态（1：可用，2：不可用）
     *
     * @param statu 状态（1：可用，2：不可用）
     */
    public void setStatu(Integer statu) {
        this.statu = statu;
    }
}