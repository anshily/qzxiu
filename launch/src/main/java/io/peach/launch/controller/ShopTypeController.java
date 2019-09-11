package io.peach.launch.controller;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.model.ShopType;
import io.peach.launch.service.ShopTypeService;
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
@RequestMapping("/shop/type")
public class ShopTypeController {
    @Resource
    private ShopTypeService shopTypeService;

    @PostMapping("/add")
    public Result add(@RequestBody ShopType shopType) {
        shopTypeService.save(shopType);
        return ResultGenerator.successResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestBody Integer id) {
        shopTypeService.deleteById(id);
        return ResultGenerator.successResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody ShopType shopType) {
        shopTypeService.update(shopType);
        return ResultGenerator.successResult();
    }

    @GetMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        ShopType shopType = shopTypeService.findById(id);
        return ResultGenerator.successResult(shopType);
    }

    @GetMapping("/list")
    public Result list(PageBean<ShopType> page) {
        PageHelper.startPage(page.getPageNum(),page.getSize());
        List<ShopType> list = shopTypeService.findAll();
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @PostMapping("/custom/list")
    public Result customList(@RequestBody ShopType shopType) {
        PageBean<ShopType> page = new PageBean<ShopType>();
    //        PageHelper.startPage(page.getPageNum(),page.getSize());
    Condition condition = new Condition(ShopType.class);
    Example.Criteria criteria = condition.createCriteria();
    criteria.andLike("id","%1%");
    List<ShopType> list = shopTypeService.findByCondition(condition);
        page.setList(list);
        return ResultGenerator.successResult(page);
    }
}
