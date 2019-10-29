package io.peach.launch.model;

import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.*;

@Table(name = "qzx_shop_message")
public class ShopMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 用户id
     */
    private Integer userid;

    /**
     * 店铺负责人联系电话
     */
    private String owner_phone;

    private  String username;
    /**
     * 店铺类型id
     */
    private Integer shoptype_id;

    @Transient
    private String shoptype_name;
    @Transient
    private String recommmend_type;

    private String description;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRecommmend_type() {
        return recommmend_type;
    }

    public void setRecommmend_type(String recommmend_type) {
        this.recommmend_type = recommmend_type;
    }

    /**
     * 店铺名称
     */
    private String shopname;
    /**
     * 店铺图片地址
     */
    private String shoppicture;

    /**
     * 店铺地址
     */
    private String shopaddress;

    /**
     * 总利润
     */
    private BigDecimal profit;

    /**
     * 已经提现的利润
     */
    private BigDecimal cashout;

    /**
     * 未提现的金钱
     */
    private BigDecimal cashin;

    private Date createtime;

    private Date updatetime;

    /**
     * 店铺状态（1：可用，2：不可用）
     */
    private Integer statu;


    public String getShoptype_name() {
        return shoptype_name;
    }

    public void setShoptype_name(String shoptype_name) {
        this.shoptype_name = shoptype_name;
    }

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
     * 获取用户id
     *
     * @return userid - 用户id
     */
    public Integer getUserid() {
        return userid;
    }

    /**
     * 设置用户id
     *
     * @param userid 用户id
     */
    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    /**
     * 获取店铺负责人联系电话
     *
     * @return owner_phone - 店铺负责人联系电话
     */
    public String getOwner_phone() {
        return owner_phone;
    }

    /**
     * 设置店铺负责人联系电话
     *
     * @param owner_phone 店铺负责人联系电话
     */
    public void setOwner_phone(String owner_phone) {
        this.owner_phone = owner_phone;
    }

    /**
     * 获取店铺类型id
     *
     * @return shoptype_id - 店铺类型id
     */
    public Integer getShoptype_id() {
        return shoptype_id;
    }

    /**
     * 设置店铺类型id
     *
     * @param shoptype_id 店铺类型id
     */
    public void setShoptype_id(Integer shoptype_id) {
        this.shoptype_id = shoptype_id;
    }

    /**
     * 获取店铺名称
     *
     * @return shopname - 店铺名称
     */
    public String getShopname() {
        return shopname;
    }

    /**
     * 设置店铺名称
     *
     * @param shopname 店铺名称
     */
    public void setShopname(String shopname) {
        this.shopname = shopname;
    }

    /**
     * 获取店铺地址
     *
     * @return shopaddress - 店铺地址
     */
    public String getShopaddress() {
        return shopaddress;
    }

    /**
     * 设置店铺地址
     *
     * @param shopaddress 店铺地址
     */
    public void setShopaddress(String shopaddress) {
        this.shopaddress = shopaddress;
    }

    public String getShoppicture() {
        return shoppicture;
    }

    public void setShoppicture(String shoppicture) {
        this.shoppicture = shoppicture;
    }

    public BigDecimal getProfit() {
        return profit;
    }

    public void setProfit(BigDecimal profit) {
        this.profit = profit;
    }

    public BigDecimal getCashout() {
        return cashout;
    }

    public void setCashout(BigDecimal cashout) {
        this.cashout = cashout;
    }

    public BigDecimal getCashin() {
        return cashin;
    }

    public void setCashin(BigDecimal cashin) {
        this.cashin = cashin;
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
     * 获取店铺状态（1：可用，2：不可用）
     *
     * @return statu - 店铺状态（1：可用，2：不可用）
     */
    public Integer getStatu() {
        return statu;
    }

    /**
     * 设置店铺状态（1：可用，2：不可用）
     *
     * @param statu 店铺状态（1：可用，2：不可用）
     */
    public void setStatu(Integer statu) {
        this.statu = statu;
    }
}