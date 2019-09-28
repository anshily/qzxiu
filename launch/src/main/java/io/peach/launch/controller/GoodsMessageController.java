package io.peach.launch.controller;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.base.core.ServiceException;
import io.peach.launch.model.GoodsMessage;
import io.peach.launch.service.GoodsMessageService;
import io.peach.launch.base.core.PageBean;
import com.github.pagehelper.PageHelper;
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
@RequestMapping("/goods/message")
public class GoodsMessageController {
    @Resource
    private GoodsMessageService goodsMessageService;

    @PostMapping("/add")
    public Result add(@RequestBody GoodsMessage goodsMessage) {
        goodsMessageService.save(goodsMessage);
        return ResultGenerator.successResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestBody Integer id) {
        goodsMessageService.deleteById(id);
        return ResultGenerator.successResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody GoodsMessage goodsMessage) {
        goodsMessageService.update(goodsMessage);
        return ResultGenerator.successResult();
    }

    @GetMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        GoodsMessage goodsMessage = goodsMessageService.findById(id);
        return ResultGenerator.successResult(goodsMessage);
    }

    @GetMapping("/list")
    public Result list(PageBean<GoodsMessage> page) {
        PageHelper.startPage(page.getPageNum(),page.getSize());
        List<GoodsMessage> list = goodsMessageService.findAll();
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @PostMapping("/custom/list")
    public Result customList(@RequestBody GoodsMessage goodsMessage) {
        PageBean<GoodsMessage> page = new PageBean<GoodsMessage>();
    //        PageHelper.startPage(page.getPageNum(),page.getSize());
    Condition condition = new Condition(GoodsMessage.class);
    Example.Criteria criteria = condition.createCriteria();
    criteria.andLike("id","%1%");
    List<GoodsMessage> list = goodsMessageService.findByCondition(condition);
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @GetMapping("/getGoodsList")
    public Result getGoodsList() {
        List<GoodsMessage> l=goodsMessageService.getGoodsList();
        Map<String,Object> map=new HashMap<>();
        map.put("goodsList",l);
        return ResultGenerator.successResult(map);
    }

    @PostMapping("/addGoods")
    public Result addGoods(@RequestBody GoodsMessage goodsMessage) {
        BigDecimal b=new BigDecimal(0);
        if(goodsMessage.getGoodsname()==null||goodsMessage.getGoodsname().equals("")||
                goodsMessage.getGoodsprice().compareTo(b)<1){
            /*判断商品名称和商品价格是否符合要求  如果不符合要求  抛出异常*/
            throw new ServiceException(5005, "商品信息不符合要求！");
        }else{
            if(goodsMessage.getGoodspicture()==null||goodsMessage.getGoodspicture().equals("")){
                goodsMessage.setGoodspicture("../uploads/20190923/625e50dc-9ddf-4c83-86c1-e36049368275.jpg");
            }
        }
        goodsMessage.setCreatetime(new Date());
        goodsMessage.setUpdatetime(new Date());
        goodsMessageService.save(goodsMessage);
        return ResultGenerator.successResult();
    }

    @PostMapping("/updateGoodsMessage")
    public Result updateGoodsMessage(@RequestBody GoodsMessage goodsMessage) {
        BigDecimal b=new BigDecimal(0);
        if(goodsMessage.getGoodsname()==null||goodsMessage.getGoodsname().equals("")||
                goodsMessage.getGoodsprice().compareTo(b)<1){
            /*判断商品名称和商品价格是否符合要求  如果不符合要求  抛出异常*/
            throw new ServiceException(5005, "商品信息不符合要求！");
        }else{
            if(goodsMessage.getGoodspicture()==null||goodsMessage.getGoodspicture().equals("")){
                goodsMessage.setGoodspicture("../uploads/20190923/625e50dc-9ddf-4c83-86c1-e36049368275.jpg");
            }
        }
        goodsMessage.setUpdatetime(new Date());
        goodsMessageService.update(goodsMessage);
        return ResultGenerator.successResult();
    }

    @GetMapping("/goodsUpOrDown")
    public Result goodsUpOrDown(@RequestParam Integer id,@RequestParam String type) {
        goodsMessageService.goodsUpOrDown(id, type);
        return ResultGenerator.successResult();
    }

    @GetMapping("/getGoodsByid")
    public Result getGoodsByid(@RequestParam Integer id) {
        GoodsMessage goodsMessage=goodsMessageService.findById(id);
        return ResultGenerator.successResult(goodsMessage);
    }


    @GetMapping("/test")
    public Result test(@RequestParam BigDecimal bigDecimal) {
        BigDecimal b=new BigDecimal(0);
        System.out.print(bigDecimal.compareTo(b));
        return ResultGenerator.successResult();
    }

}
