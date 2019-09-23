package io.peach.launch.controller;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.model.GoodsMessage;
import io.peach.launch.service.GoodsMessageService;
import io.peach.launch.base.core.PageBean;
import com.github.pagehelper.PageHelper;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.math.BigDecimal;
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
       /* if(goodsMessage.getGoodsname()!=){}*/
        goodsMessageService.save(goodsMessage);
        return ResultGenerator.successResult();
    }

    @PostMapping("/test")
    public Result test(@RequestParam BigDecimal bigDecimal) {
        System.out.print(bigDecimal);
        return ResultGenerator.successResult();
    }

}
