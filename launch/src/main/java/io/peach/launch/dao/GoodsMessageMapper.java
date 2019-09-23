package io.peach.launch.dao;

import io.peach.launch.base.core.Mapper;
import io.peach.launch.model.GoodsMessage;

import java.util.List;

public interface GoodsMessageMapper extends Mapper<GoodsMessage> {
    List<GoodsMessage> getGoodsList();
}