package io.peach.launch.dao;

import io.peach.launch.base.core.Mapper;
import io.peach.launch.model.GoodsMessage;
import io.peach.launch.model.Order;
import io.peach.launch.model.OrderMessage;

import java.util.List;

public interface OrderMapper extends Mapper<Order> {
    List<Order> selectOrderByShopid(int shopid);
    List<OrderMessage> selectOrderMessageByOrderid(String orderid);
    void cancelOrder(String orderid);
    void finishOrder(String orderid);
    GoodsMessage selectGoodsMessageById(int id);

}