package io.peach.launch.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "qzx_point")
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 返点类型（推荐人，地区）
     */
    private String type;

    /**
     * 返点级别（1：一级，2:二级）
     */
    private Integer level;

    private Float percentage;

    private Date createtime;

    private Date updatetime;

    /**
     * 状态（1：可用，0：不可用）
     */
    private Integer state;

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
     * 获取返点类型（推荐人，地区）
     *
     * @return type - 返点类型（推荐人，地区）
     */
    public String getType() {
        return type;
    }

    /**
     * 设置返点类型（推荐人，地区）
     *
     * @param type 返点类型（推荐人，地区）
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * 获取返点级别（1：一级，2:二级）
     *
     * @return level - 返点级别（1：一级，2:二级）
     */
    public Integer getLevel() {
        return level;
    }

    /**
     * 设置返点级别（1：一级，2:二级）
     *
     * @param level 返点级别（1：一级，2:二级）
     */
    public void setLevel(Integer level) {
        this.level = level;
    }

    /**
     * @return percentage
     */
    public Float getPercentage() {
        return percentage;
    }

    /**
     * @param percentage
     */
    public void setPercentage(Float percentage) {
        this.percentage = percentage;
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
     * @return state - 状态（1：可用，0：不可用）
     */
    public Integer getState() {
        return state;
    }

    /**
     * 设置状态（1：可用，0：不可用）
     *
     * @param state 状态（1：可用，0：不可用）
     */
    public void setState(Integer state) {
        this.state = state;
    }
}