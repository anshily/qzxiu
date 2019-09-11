package io.peach.launch.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "qzx_roll_picture")
public class RollPicture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 图片地址
     */
    private String picture_address;

    /**
     * 图片备注
     */
    private String note;

    private Date createtime;

    private Date updatetime;

    /**
     * 图片是否上架（1：上架，0：未上架）
     */
    private Integer isputon;

    /**
     * 图片是否删除（1：删除，0：未删除）
     */
    private Integer isdelete;

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
     * 获取图片地址
     *
     * @return picture_address - 图片地址
     */
    public String getPicture_address() {
        return picture_address;
    }

    /**
     * 设置图片地址
     *
     * @param picture_address 图片地址
     */
    public void setPicture_address(String picture_address) {
        this.picture_address = picture_address;
    }

    /**
     * 获取图片备注
     *
     * @return note - 图片备注
     */
    public String getNote() {
        return note;
    }

    /**
     * 设置图片备注
     *
     * @param note 图片备注
     */
    public void setNote(String note) {
        this.note = note;
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
     * 获取图片是否上架（1：上架，0：未上架）
     *
     * @return isputon - 图片是否上架（1：上架，0：未上架）
     */
    public Integer getIsputon() {
        return isputon;
    }

    /**
     * 设置图片是否上架（1：上架，0：未上架）
     *
     * @param isputon 图片是否上架（1：上架，0：未上架）
     */
    public void setIsputon(Integer isputon) {
        this.isputon = isputon;
    }

    /**
     * 获取图片是否删除（1：删除，0：未删除）
     *
     * @return isdelete - 图片是否删除（1：删除，0：未删除）
     */
    public Integer getIsdelete() {
        return isdelete;
    }

    /**
     * 设置图片是否删除（1：删除，0：未删除）
     *
     * @param isdelete 图片是否删除（1：删除，0：未删除）
     */
    public void setIsdelete(Integer isdelete) {
        this.isdelete = isdelete;
    }
}