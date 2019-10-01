package io.peach.launch.controller;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.dto.GoodsMessageDTO;
import io.peach.launch.dto.ShopCar;
import io.peach.launch.model.Order;
import io.peach.launch.model.OrderMessage;
import io.peach.launch.model.ShopMessage;
import io.peach.launch.service.OrderMessageService;
import io.peach.launch.service.OrderService;
import io.peach.launch.base.core.PageBean;
import com.github.pagehelper.PageHelper;
import io.peach.launch.service.ShopMessageService;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
* Created by anshi on 2019/09/11.
*/
@RestController
@RequestMapping("/order")
public class OrderController {
    @Resource
    private OrderService orderService;
    @Resource
    private OrderMessageService orderMessageService;
    @Resource
    private ShopMessageService shopMessageService;

    @PostMapping("/add")
    public Result add(@RequestBody Order order) {
        orderService.save(order);
        return ResultGenerator.successResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestBody Integer id) {
        orderService.deleteById(id);
        return ResultGenerator.successResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody Order order) {
        orderService.update(order);
        return ResultGenerator.successResult();
    }

    @GetMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        Order order = orderService.findById(id);
        return ResultGenerator.successResult(order);
    }

    @GetMapping("/list")
    public Result list(PageBean<Order> page) {
        PageHelper.startPage(page.getPageNum(),page.getSize());
        List<Order> list = orderService.findAll();
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @PostMapping("/custom/list")
    public Result customList(@RequestBody Order order) {
        PageBean<Order> page = new PageBean<Order>();
    //        PageHelper.startPage(page.getPageNum(),page.getSize());
    Condition condition = new Condition(Order.class);
    Example.Criteria criteria = condition.createCriteria();
    criteria.andLike("id","%1%");
    List<Order> list = orderService.findByCondition(condition);
        page.setList(list);
        return ResultGenerator.successResult(page);
    }


    @PostMapping("/shopCar")
    public Result shopCar(@RequestBody ShopCar shopCar){
         /*先创建一个订单对象  shopid   goodsnum   priceAll*/
        /*创建一个随机订单编号 时间戳+4位随机数字*/
        String orderid=new Date().getTime()+""+Math.round(Math.random() * 10000);
        BigDecimal priceAll=new BigDecimal(0);
        OrderMessage orderMessage=new OrderMessage();
        int goodsnum=0;
        for (GoodsMessageDTO g:shopCar.getList()) {
            goodsnum+=g.getGoodsNum();
            priceAll=priceAll.add(new BigDecimal(g.getGoodsNum()).multiply(g.getGoodsPrice()));
            orderMessage.setOrderid(orderid);
            orderMessage.setGoodsid(g.getGoodsId());
            orderMessage.setQuantity(g.getGoodsNum());
            orderMessage.setCreatetime(new Date());
            orderMessage.setUpdatetime(new Date());
            orderMessageService.save(orderMessage);
        }
        /*创建订单*/
        Order order=new Order();
        order.setShopid(shopCar.getShopId());
        order.setGoodsnum(goodsnum);
        order.setPriceall(priceAll);
        order.setUpdatetime(new Date());
        order.setCreatetime(new Date());
        order.setOrderid(orderid);
        orderService.save(order);
        return ResultGenerator.successResult();
    }

    @GetMapping("/selectOrderByShopid")
    public Result selectOrderByShopid(@RequestParam Integer shopid){
        List<Order> list=orderService.selectOrderByShopid(shopid);
        Map<String,Object> map=new HashMap<>();
        map.put("OrderList",list);
        return ResultGenerator.successResult(map);
    }

    @GetMapping("/selectOrderMessageByOrderid")
    public Result selectOrderMessageByOrderid(@RequestParam Integer orderid){
        List<OrderMessage> list=orderService.selectOrderMessageByOrderid(orderid);
        Map<String,Object> map=new HashMap<>();
        map.put("OrderMessageList",list);
        return ResultGenerator.successResult(map);
    }
    @GetMapping("/cancelOrder")
    public Result cancelOrder(@RequestParam Integer orderid){
        orderService.cancelOrder(orderid);
        return ResultGenerator.successResult();
    }
    @GetMapping("/getOrderByStatu")
    public Result getOrderByStatu(@RequestParam Integer shopid,@RequestParam Integer statu){
        Condition condition = new Condition(Order.class);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andCondition("id="+shopid);
        criteria.andCondition("statu="+statu);
        List<Order> list = orderService.findByCondition(condition);
        return ResultGenerator.successResult(list);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    @GetMapping("/finishOrder")
    public Result finishOrder(@RequestParam Integer orderid){
        orderService.finishOrder(orderid);
        Order order=orderService.findById(orderid);
        ShopMessage shopMessagePerson=shopMessageService.getFShopPerson(order.getShopid());
        ShopMessage shopMessagePosition=shopMessageService.getFShopPosition(order.getShopid());
        shopMessageService.balanceMoney(order.getShopid(),shopMessagePerson.getId(),shopMessagePosition.getId(),order.getPriceall());
        return ResultGenerator.successResult();
    }

}
