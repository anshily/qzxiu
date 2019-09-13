package io.peach.launch.controller;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.model.ShopMessage;
import io.peach.launch.service.ShopMessageService;
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
@RequestMapping("/shop/message")
public class ShopMessageController {
    @Resource
    private ShopMessageService shopMessageService;

    @PostMapping("/add")
    public Result add(@RequestBody ShopMessage shopMessage) {
        shopMessageService.save(shopMessage);
        return ResultGenerator.successResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestBody Integer id) {
        shopMessageService.deleteById(id);
        return ResultGenerator.successResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody ShopMessage shopMessage) {
        shopMessageService.update(shopMessage);
        return ResultGenerator.successResult();
    }

    @GetMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        ShopMessage shopMessage = shopMessageService.findById(id);
        return ResultGenerator.successResult(shopMessage);
    }

    @GetMapping("/list")
    public Result list(PageBean<ShopMessage> page) {
        PageHelper.startPage(page.getPageNum(),page.getSize());
        List<ShopMessage> list = shopMessageService.findAll();
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @PostMapping("/custom/list")
    public Result customList(@RequestBody ShopMessage shopMessage) {
        PageBean<ShopMessage> page = new PageBean<ShopMessage>();
    //        PageHelper.startPage(page.getPageNum(),page.getSize());
    Condition condition = new Condition(ShopMessage.class);
    Example.Criteria criteria = condition.createCriteria();
    criteria.andLike("id","%1%");
    List<ShopMessage> list = shopMessageService.findByCondition(condition);
        page.setList(list);
        return ResultGenerator.successResult(page);
    }
}
