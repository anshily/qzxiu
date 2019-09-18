package io.peach.launch.dao;

import io.peach.launch.base.core.Mapper;
import io.peach.launch.model.ShopMessage;
import org.apache.ibatis.annotations.Param;

public interface ShopMessageMapper extends Mapper<ShopMessage> {
    void addGradingRecommend(@Param(value = "shopid") int shopid,@Param(value = "recommendid") int recommendid);
    void addGradingPosition(@Param(value = "shopid") int shopid,@Param(value = "positionid") int positionid);
}