package io.peach.launch.dao;

import io.peach.launch.base.core.Mapper;
import io.peach.launch.model.GoodsMessage;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface GoodsMessageMapper extends Mapper<GoodsMessage> {
    List<GoodsMessage> getGoodsList();
    void goodsUpOrDown(@Param(value = "id") Integer id,@Param(value = "type") String type);
}