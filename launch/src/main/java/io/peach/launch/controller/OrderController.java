package io.peach.launch.controller;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.base.core.ServiceException;
import io.peach.launch.dto.GoodsMessageDTO;
import io.peach.launch.dto.OrderMessageDTO;
import io.peach.launch.dto.ShopCar;
import io.peach.launch.model.*;
import io.peach.launch.service.*;
import io.peach.launch.base.core.PageBean;
import com.github.pagehelper.PageHelper;
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
    @Resource
    private UserService userService;
    @Resource
    private RecordService recordService;

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
    @GetMapping("/orderList")
    public Result orderList(PageBean<Order> page) {
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
          /*根据用户token获取用户的id*/
        User user=userService.getUserInfoByToken(shopCar.getToken());
        if (user == null){
            throw new ServiceException(5008,"用戶未登錄！");
        }
        if(userService.getRoleNameByUserid(user.getId()).equals("游客")){
            throw new ServiceException(5008,"无权限操作！");
        }
         /*先创建一个订单对象  shopid   goodsnum   priceAll*/
        /*创建一个随机订单编号 时间戳+4位随机数字*/
        String orderid=new Date().getTime()+""+Math.round(Math.random() * 10000);
        BigDecimal priceAll=new BigDecimal(0);
        int goodsnum=0;
        for (GoodsMessageDTO g:shopCar.getList()) {
            OrderMessage orderMessage=new OrderMessage();
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
    public Result selectOrderMessageByOrderid(@RequestParam String orderid){
        List<OrderMessageDTO> list=orderService.selectOrderMessageByOrderid(orderid);
        return ResultGenerator.successResult(list);
    }
    @GetMapping("/cancelOrder")
    public Result cancelOrder(@RequestParam String  orderid,@RequestParam String token){
          /*根据用户token获取用户的id*/
        User user=userService.getUserInfoByToken(token);
        if (user == null){
            throw new ServiceException(5008,"用戶未登錄！");
        }
        orderService.cancelOrder(orderid);
        return ResultGenerator.successResult();
    }
    @GetMapping("/adminGetOrderByStatu")
    public Result adminGetOrderByStatu(@RequestParam Integer statu){
        Condition condition = new Condition(Order.class);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andCondition("statu="+statu);
        List<Order> list = orderService.findByCondition(condition);
        return ResultGenerator.successResult(list);
    }
    @GetMapping("/getOrderByStatu")
    public Result getOrderByStatu(@RequestParam Integer shopid,@RequestParam Integer statu){
        Condition condition = new Condition(Order.class);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andCondition("shopid="+shopid);
        criteria.andCondition("statu="+statu);
        List<Order> list = orderService.findByCondition(condition);
        return ResultGenerator.successResult(list);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    @GetMapping("/finishOrder")
    public Result finishOrder(@RequestParam String orderid,@RequestParam String token){
          /*根据用户token获取用户的id*/
        User user=userService.getUserInfoByToken(token);
        if (user == null){
            throw new ServiceException(5008,"用戶未登錄！");
        }
        if(!userService.getRoleNameByUserid(user.getId()).equals("总店管理员")){
            throw new ServiceException(5008,"无权限操作！");
        }
        Condition condition = new Condition(Order.class);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andCondition("orderid="+orderid);
        orderService.finishOrder(orderid);
        Order order=orderService.findByCondition(condition).get(0);

        /*订单金额结算*/
        /*查询出上级是代理还是普通联盟店*/
        ShopMessage shopMessagePerson=shopMessageService.getFShopPerson(order.getShopid());
        /*如果是总店  直接退出*/
        if(shopMessagePerson.getId()==1){
            return ResultGenerator.successResult();
        }
        int goodsSum=0;
        if(shopMessagePerson.getShoptype_id()!=1){
            /*代理的情况*/
            /*先根据订单号查询出订单内的详细信息*/
            List<OrderMessageDTO> list=orderService.selectOrderMessageByOrderid(orderid);
            /*计算佣金是多少*/
            BigDecimal profit=new BigDecimal(0);
            /*BigDecimal cashin=new BigDecimal(0);*/
            for (OrderMessageDTO o:list) {
                profit=profit.add(o.getGoodsMessage().getDai().multiply(new BigDecimal(o.getQuantity())));
                goodsSum+=o.getQuantity();
            }
            /*根据店铺id查询出店铺的信息*/
            ShopMessage s=shopMessageService.getShopMessageByid(order.getShopid());
            s.setCashin(s.getCashin().add(profit));
            s.setProfit(s.getProfit().add(profit));
            s.setUpdatetime(new Date());
            shopMessageService.update(s);
            Record r=new Record();
            r.setType("商品提成");
            r.setMoney(profit);
            r.setShopid(shopMessagePerson.getId());
            r.setSourceid(order.getShopid());
            recordService.save(r);
        }else{
            /*如果是普通店铺*/
             /*先根据订单号查询出订单内的详细信息*/
            List<OrderMessageDTO> list=orderService.selectOrderMessageByOrderid(orderid);
            /*计算佣金是多少*/
            BigDecimal profit=new BigDecimal(0);
            /*BigDecimal cashin=new BigDecimal(0);*/
            for (OrderMessageDTO o:list) {
                profit=profit.add(o.getGoodsMessage().getDan().multiply(new BigDecimal(o.getQuantity())));
                goodsSum+=o.getQuantity();
            }
            /*根据店铺id查询出店铺的信息*/
            ShopMessage s=shopMessageService.getShopMessageByid(order.getShopid());
            s.setCashin(s.getCashin().add(profit));
            s.setProfit(s.getProfit().add(profit));
            s.setUpdatetime(new Date());
            shopMessageService.update(s);
            Record r=new Record();
            r.setType("商品提成");
            r.setMoney(profit);
            r.setShopid(shopMessagePerson.getId());
            r.setSourceid(order.getShopid());
            recordService.save(r);
        }

        /*同时计算所有上级代理的利润  当前店铺所有的上级代理 除了总店 都有*/
        List<ShopMessage> allDai=orderService.getAllDaiLi(order.getShopid());
        for (ShopMessage SM:allDai) {
            /*先判断当前店铺是总代还是普通代理 3是总代*/
            if(SM.getShoptype_id()==3){
                SM.setProfit(SM.getProfit().add(new BigDecimal(goodsSum)).multiply(new BigDecimal(4)));
                SM.setCashin(SM.getCashin().add(new BigDecimal(goodsSum)).multiply(new BigDecimal(4)));
                shopMessageService.update(SM);
                Record r=new Record();
                r.setType("商品地区代理提成");
                r.setMoney(new BigDecimal(goodsSum).multiply(new BigDecimal(4)));
                r.setShopid(SM.getId());
                r.setSourceid(order.getShopid());
                recordService.save(r);
            }else{
                SM.setProfit(SM.getProfit().add(new BigDecimal(goodsSum)).multiply(new BigDecimal(10)));
                SM.setCashin(SM.getCashin().add(new BigDecimal(goodsSum)).multiply(new BigDecimal(10)));
                Record r=new Record();
                r.setType("商品地区代理提成");
                r.setMoney(new BigDecimal(goodsSum).multiply(new BigDecimal(10)));
                r.setShopid(SM.getId());
                r.setSourceid(order.getShopid());
                recordService.save(r);
            }
        }
        /*ShopMessage shopMessagePosition=shopMessageService.getFShopPosition(order.getShopid());*/
        /*shopMessageService.balanceMoney(order.getShopid(),shopMessagePerson.getId(),shopMessagePosition.getId());*/
        return ResultGenerator.successResult();
    }

}
