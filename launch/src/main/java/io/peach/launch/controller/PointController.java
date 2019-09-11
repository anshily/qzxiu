package io.peach.launch.controller;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.model.Point;
import io.peach.launch.service.PointService;
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
@RequestMapping("/point")
public class PointController {
    @Resource
    private PointService pointService;

    @PostMapping("/add")
    public Result add(@RequestBody Point point) {
        pointService.save(point);
        return ResultGenerator.successResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestBody Integer id) {
        pointService.deleteById(id);
        return ResultGenerator.successResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody Point point) {
        pointService.update(point);
        return ResultGenerator.successResult();
    }

    @GetMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        Point point = pointService.findById(id);
        return ResultGenerator.successResult(point);
    }

    @GetMapping("/list")
    public Result list(PageBean<Point> page) {
        PageHelper.startPage(page.getPageNum(),page.getSize());
        List<Point> list = pointService.findAll();
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @PostMapping("/custom/list")
    public Result customList(@RequestBody Point point) {
        PageBean<Point> page = new PageBean<Point>();
    //        PageHelper.startPage(page.getPageNum(),page.getSize());
    Condition condition = new Condition(Point.class);
    Example.Criteria criteria = condition.createCriteria();
    criteria.andLike("id","%1%");
    List<Point> list = pointService.findByCondition(condition);
        page.setList(list);
        return ResultGenerator.successResult(page);
    }
}
