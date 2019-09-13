package io.peach.launch.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "qzx_signup_message")
public class SignupMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 用户姓名
     */
    private String name;

    /**
     * 用户手机号码
     */
    private String phone;

    /**
     * 用户所在地址
     */
    private String address;

    private Date createtime;

    private Date updatetime;

    /**
     * 状态（1：未读，2：已读）
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
     * 获取用户姓名
     *
     * @return name - 用户姓名
     */
    public String getName() {
        return name;
    }

    /**
     * 设置用户姓名
     *
     * @param name 用户姓名
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 获取用户手机号码
     *
     * @return phone - 用户手机号码
     */
    public String getPhone() {
        return phone;
    }

    /**
     * 设置用户手机号码
     *
     * @param phone 用户手机号码
     */
    public void setPhone(String phone) {
        this.phone = phone;
    }

    /**
     * 获取用户所在地址
     *
     * @return address - 用户所在地址
     */
    public String getAddress() {
        return address;
    }

    /**
     * 设置用户所在地址
     *
     * @param address 用户所在地址
     */
    public void setAddress(String address) {
        this.address = address;
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
     * 获取状态（1：未读，2：已读）
     *
     * @return statu - 状态（1：未读，2：已读）
     */
    public Integer getStatu() {
        return statu;
    }

    /**
     * 设置状态（1：未读，2：已读）
     *
     * @param statu 状态（1：未读，2：已读）
     */
    public void setStatu(Integer statu) {
        this.statu = statu;
    }
}