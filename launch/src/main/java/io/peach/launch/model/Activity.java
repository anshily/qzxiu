package io.peach.launch.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "qzx_activity")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 活动名称
     */
    private String activityname;

    private Date createtime;

    private Date updatetime;

    /**
     * 状态（1：可用，0：不可用）
     */
    private Integer statu;

    /**
     * 活动
     */
    private String note;

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
     * 获取活动名称
     *
     * @return activityname - 活动名称
     */
    public String getActivityname() {
        return activityname;
    }

    /**
     * 设置活动名称
     *
     * @param activityname 活动名称
     */
    public void setActivityname(String activityname) {
        this.activityname = activityname;
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

    public void setStatu(Integer statu) {
        this.statu = statu;
    }

    /**
     * 获取活动
     *
     * @return note - 活动
     */
    public String getNote() {
        return note;
    }

    /**
     * 设置活动
     *
     * @param note 活动
     */
    public void setNote(String note) {
        this.note = note;
    }
}