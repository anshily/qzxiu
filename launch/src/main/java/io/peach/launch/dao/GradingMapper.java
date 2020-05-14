package io.peach.launch.dao;

import io.peach.launch.base.core.Mapper;
import io.peach.launch.model.Grading;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface GradingMapper extends Mapper<Grading> {
    Integer selectFShopIdByTypeAndShopid(@Param(value = "shopid")Integer shopid,@Param(value = "type")String type);
    Integer cancelOriginFShopIdByTypeAndShopid(@Param(value = "shopid")Integer shopid,@Param(value = "type")String type);
    List<Integer> getChildShopIdByTypeAndFshopid(@Param(value = "Fshopid")Integer Fshopid,@Param(value = "type")String type);
    void updateFshopidSameType(@Param(value = "shopid")Integer shopid,@Param(value = "type")String type,@Param(value = "Fshopid")Integer Fshopid);
    void insertCodeSameType(@Param(value = "shopid")Integer shopid,@Param(value = "type")String type,@Param(value = "Fshopid")Integer Fshopid);
}