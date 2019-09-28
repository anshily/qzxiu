package io.peach.launch.dao;

import io.peach.launch.base.core.Mapper;
import io.peach.launch.model.Order;
import io.peach.launch.model.OrderMessage;

import java.util.List;

public interface OrderMapper extends Mapper<Order> {
    List<Order> selectOrderByShopid(int shopid);
    List<OrderMessage> selectOrderMessageByOrderid(int orderid);
    void cancelOrder(int orderid);
    void finishOrder(int orderid);

}