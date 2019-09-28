package io.peach.launch.service.impl;

import io.peach.launch.dao.OrderMapper;
import io.peach.launch.dto.GoodsMessageDTO;
import io.peach.launch.dto.ShopCar;
import io.peach.launch.model.Order;
import io.peach.launch.model.OrderMessage;
import io.peach.launch.service.OrderService;
import io.peach.launch.base.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.List;


/**
 * Created by anshi on 2019/09/11.
 */
@Service
@Transactional
public class OrderServiceImpl extends AbstractService<Order> implements OrderService {
    @Resource
    private OrderMapper qzxOrderMapper;

    @Override
    public List<Order> selectOrderByShopid(Integer shopid) {
        List<Order> list=qzxOrderMapper.selectOrderByShopid(shopid);
        return list;
    }

    @Override
    public List<OrderMessage> selectOrderMessageByOrderid(Integer orderid) {
        List<OrderMessage> list=qzxOrderMapper.selectOrderMessageByOrderid(orderid);
        return list;
    }



    @Override
    public void cancelOrder(Integer orderid) {
        qzxOrderMapper.cancelOrder(orderid);
    }

    @Override
    public void finishOrder(Integer orderid) {
        qzxOrderMapper.finishOrder(orderid);
    }
}
