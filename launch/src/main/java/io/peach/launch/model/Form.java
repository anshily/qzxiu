package io.peach.launch.model;

import javax.persistence.*;

@Table(name = "qzx_form")
public class Form {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    /**
     * 填写省市县
     */
    private String address;

    /**
     * 电话号码
     */
    private String phone;

    /**
     * 未读1，已读2，删除3
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
     * @return name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 获取填写省市县
     *
     * @return address - 填写省市县
     */
    public String getAddress() {
        return address;
    }

    /**
     * 设置填写省市县
     *
     * @param address 填写省市县
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * 获取电话号码
     *
     * @return phone - 电话号码
     */
    public String getPhone() {
        return phone;
    }

    /**
     * 设置电话号码
     *
     * @param phone 电话号码
     */
    public void setPhone(String phone) {
        this.phone = phone;
    }

    /**
     * 获取未读1，已读2，删除3
     *
     * @return statu - 未读1，已读2，删除3
     */
    public Integer getStatu() {
        return statu;
    }

    /**
     * 设置未读1，已读2，删除3
     *
     * @param statu 未读1，已读2，删除3
     */
    public void setStatu(Integer statu) {
        this.statu = statu;
    }
}