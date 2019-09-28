package io.peach.launch.dao;

import io.peach.launch.base.core.Mapper;
import io.peach.launch.model.ShopType;
import org.apache.ibatis.annotations.Param;

public interface ShopTypeMapper extends Mapper<ShopType> {
    void shopTypeUpOrDown(@Param(value = "id") int id,@Param(value = "type") String type);
}