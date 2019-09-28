package io.peach.launch.service;
import io.peach.launch.dto.ShopCar;
import io.peach.launch.model.Order;
import io.peach.launch.base.core.Service;
import io.peach.launch.model.OrderMessage;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;


/**
 * Created by anshi on 2019/09/11.
 */
public interface OrderService extends Service<Order> {

    List<Order> selectOrderByShopid(Integer shopid);
    List<OrderMessage> selectOrderMessageByOrderid(Integer orderid);
    void cancelOrder(Integer orderid);
    void finishOrder(Integer orderid);
}
