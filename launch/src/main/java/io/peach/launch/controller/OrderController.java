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
    public Result adminGetOrderByStatu(@RequestParam Integer statu,@RequestParam Integer pi,@RequestParam Integer ps){
        PageBean<Order> page = new PageBean<Order>();
        PageHelper.startPage(pi,ps);
        Condition condition = new Condition(Order.class);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andCondition("statu="+statu);
        List<Order> list = orderService.findByCondition(condition);
        page.setList(list);
        return ResultGenerator.successResult(page);
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
        Order order=orderService.findByCondition(condition).get(0);

       /*先计算推荐人的商品提成*/
        /*先根据订单号查询出订单内的详细信息*/
        List<OrderMessageDTO> list=orderService.selectOrderMessageByOrderid(orderid);
            /*计算佣金是多少*/
        BigDecimal positionProfit=new BigDecimal(0);
        BigDecimal personProfit=new BigDecimal(0);
        int goodsSum=0;
            /*BigDecimal cashin=new BigDecimal(0);*/
        for (OrderMessageDTO o:list) {
            personProfit=personProfit.add(o.getGoodsMessage().getPersonmoney().multiply(new BigDecimal(o.getQuantity())));
            positionProfit=positionProfit.add(o.getGoodsMessage().getPositionmoney().multiply(new BigDecimal(o.getQuantity())));
            goodsSum+=o.getQuantity();
        }
        /*查询出当前店铺的推荐人*/
        ShopMessage FPersonShop=shopMessageService.getFShopPerson(order.getShopid());
        /*如果推荐人是总店，不用计算提成*/
        if(FPersonShop.getId()!=1){
            FPersonShop.setProfit(FPersonShop.getProfit().add(personProfit));
            FPersonShop.setCashin(FPersonShop.getCashin().add(personProfit));
            FPersonShop.setUpdatetime(new Date());
            shopMessageService.update(FPersonShop);
            /*插入一条记录*/
            Record r=new Record();
            r.setType("推荐人的商品提成");
            r.setCreatetime(new Date());
            r.setUpdatetime(new Date());
            r.setName(FPersonShop.getUsername());
            r.setMoney(personProfit);
            r.setShopid(FPersonShop.getId());
            r.setSourceid(order.getShopid());
            recordService.save(r);
        }

        /*再计算当前第一个代理的地区提成*/
        ShopMessage FPositionShop=shopMessageService.getFShopPosition(order.getShopid());
        /*如果是总店 不计算*/
        if(FPositionShop.getId()!=1){
            FPositionShop.setProfit(FPositionShop.getProfit().add(positionProfit));
            FPositionShop.setCashin(FPositionShop.getCashin().add(positionProfit));
            FPositionShop.setUpdatetime(new Date());
            shopMessageService.update(FPositionShop);
            /*插入一条记录*/
            Record r=new Record();
            r.setType("商品地区代理提成");
            r.setCreatetime(new Date());
            r.setUpdatetime(new Date());
            r.setName(FPositionShop.getUsername());
            r.setMoney(positionProfit);
            r.setShopid(FPositionShop.getId());
            r.setSourceid(order.getShopid());
            recordService.save(r);
        }

        /*计算代理和总代的地区提成  第一个地区代理不用计算*/
        List<ShopMessage> list1=orderService.getAllDaiLi(order.getShopid());
        /*list中去掉了总店，但是必须得保证店铺数量大于1才可以*/
        if(list1.size()>1){
            for(int i=1;i<list1.size();i++){
                ShopMessage shopMessage=list1.get(i);
                /*如果是总代理 6块钱   如果是普通代理  10块*/
                if(shopMessage.getShoptype_id()==3){
                    shopMessage.setCashin(shopMessage.getCashin().add(new BigDecimal(6).multiply(new BigDecimal(goodsSum))));
                    shopMessage.setProfit(shopMessage.getProfit().add(new BigDecimal(6).multiply(new BigDecimal(goodsSum))));
                    shopMessage.setUpdatetime(new Date());
                    shopMessageService.update(shopMessage);
                    Record r=new Record();
                    r.setType("商品地区代理提成");
                    r.setCreatetime(new Date());
                    r.setUpdatetime(new Date());
                    r.setName(shopMessage.getUsername());
                    r.setMoney(new BigDecimal(goodsSum).multiply(new BigDecimal(6)));
                    r.setShopid(shopMessage.getId());
                    r.setSourceid(order.getShopid());
                    recordService.save(r);;
                }else{
                    shopMessage.setCashin(shopMessage.getCashin().add(new BigDecimal(10).multiply(new BigDecimal(goodsSum))));
                    shopMessage.setProfit(shopMessage.getProfit().add(new BigDecimal(10).multiply(new BigDecimal(goodsSum))));
                    shopMessage.setUpdatetime(new Date());
                    shopMessageService.update(shopMessage);
                    Record r=new Record();
                    r.setType("商品地区代理提成");
                    r.setCreatetime(new Date());
                    r.setUpdatetime(new Date());
                    r.setName(shopMessage.getUsername());
                    r.setMoney(new BigDecimal(goodsSum).multiply(new BigDecimal(10)));
                    r.setShopid(shopMessage.getId());
                    r.setSourceid(order.getShopid());
                    recordService.save(r);;
                }
            }
        }
        /*完成订单*/
        orderService.finishOrder(orderid);
        return ResultGenerator.successResult();
    }

}
