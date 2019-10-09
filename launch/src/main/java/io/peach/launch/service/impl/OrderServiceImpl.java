package io.peach.launch.service.impl;

import io.peach.launch.dao.OrderMapper;
import io.peach.launch.dto.GoodsMessageDTO;
import io.peach.launch.dto.OrderMessageDTO;
import io.peach.launch.dto.ShopCar;
import io.peach.launch.model.GoodsMessage;
import io.peach.launch.model.Order;
import io.peach.launch.model.OrderMessage;
import io.peach.launch.service.OrderService;
import io.peach.launch.base.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.ArrayList;
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
    public  List<OrderMessageDTO> selectOrderMessageByOrderid(String orderid) {
        List<OrderMessage> list=qzxOrderMapper.selectOrderMessageByOrderid(orderid);
        List<OrderMessageDTO> l=new ArrayList<>();
        for (OrderMessage o:list) {
            GoodsMessage g=qzxOrderMapper.selectGoodsMessageById(o.getGoodsid());
            OrderMessageDTO omDTO=new OrderMessageDTO();
            omDTO.setGoodsMessage(g);
            omDTO.setQuantity(o.getQuantity());
            l.add(omDTO);
        }
        return l;
    }



    @Override
    public void cancelOrder(String orderid) {
        qzxOrderMapper.cancelOrder(orderid);
    }

    @Override
    public void finishOrder(String orderid) {
        qzxOrderMapper.finishOrder(orderid);
    }
}
