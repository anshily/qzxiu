package io.peach.launch.controller;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.model.OrderMessage;
import io.peach.launch.service.OrderMessageService;
import io.peach.launch.base.core.PageBean;
import com.github.pagehelper.PageHelper;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.List;

/**
* Created by anshi on 2019/09/11.
*/
@RestController
@RequestMapping("/order/message")
public class OrderMessageController {
    @Resource
    private OrderMessageService orderMessageService;

    @PostMapping("/add")
    public Result add(@RequestBody OrderMessage orderMessage) {
        orderMessageService.save(orderMessage);
        return ResultGenerator.successResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestBody Integer id) {
        orderMessageService.deleteById(id);
        return ResultGenerator.successResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody OrderMessage orderMessage) {
        orderMessageService.update(orderMessage);
        return ResultGenerator.successResult();
    }

    @GetMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        OrderMessage orderMessage = orderMessageService.findById(id);
        return ResultGenerator.successResult(orderMessage);
    }

    @GetMapping("/list")
    public Result list(PageBean<OrderMessage> page) {
        PageHelper.startPage(page.getPageNum(),page.getSize());
        List<OrderMessage> list = orderMessageService.findAll();
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @PostMapping("/custom/list")
    public Result customList(@RequestBody OrderMessage orderMessage) {
        PageBean<OrderMessage> page = new PageBean<OrderMessage>();
    //        PageHelper.startPage(page.getPageNum(),page.getSize());
    Condition condition = new Condition(OrderMessage.class);
    Example.Criteria criteria = condition.createCriteria();
    criteria.andLike("id","%1%");
    List<OrderMessage> list = orderMessageService.findByCondition(condition);
        page.setList(list);
        return ResultGenerator.successResult(page);
    }
}
