package io.peach.launch.dao;

import io.peach.launch.base.core.Mapper;
import io.peach.launch.model.Record;
import io.peach.launch.model.ShopMessage;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface ShopMessageMapper extends Mapper<ShopMessage> {
    void addGradingRecommend(@Param(value = "shopid") int shopid,@Param(value = "recommendid") int recommendid);
    void addGradingPosition(@Param(value = "shopid") int shopid,@Param(value = "positionid") int positionid);
    BigDecimal getShopMoney(int shopid);
    List<Map<String,String>> getRecommendAndPosition();
    List<Map<String,BigDecimal>> getPoint();
    void changeMoneyByShopid(@Param(value = "shopid") int shopid,@Param(value = "money") BigDecimal money);
    ShopMessage getShopMessageByid(int shopid);
    void updateShopMoney(@Param(value = "shopid") int shopid,@Param(value = "profit") BigDecimal profit,@Param(value = "cashin") BigDecimal cashin);
    ShopMessage getTwoGradingPerson(int shopid);
    ShopMessage getTwoGradingPosition(int shopid);
    void insertRecord(@Param(value = "record")Record record);
    List<ShopMessage> getShopList();
    ShopMessage getFShopPerson(int shopid);
    ShopMessage getFShopPosition(int shopid);
    List<ShopMessage> getChildShopMessage(int shopid);
}