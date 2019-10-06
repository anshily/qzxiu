package io.peach.launch.controller;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.model.Grading;
import io.peach.launch.service.GradingService;
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
@RequestMapping("/grading")
public class GradingController {
    @Resource
    private GradingService gradingService;

    @PostMapping("/add")
    public Result add(@RequestBody Grading grading) {
        gradingService.save(grading);
        return ResultGenerator.successResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestBody Integer id) {
        gradingService.deleteById(id);
        return ResultGenerator.successResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody Grading grading) {
        gradingService.update(grading);
        return ResultGenerator.successResult();
    }

    @GetMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        Grading grading = gradingService.findById(id);
        return ResultGenerator.successResult(grading);
    }

    @GetMapping("/list")
    public Result list(PageBean<Grading> page) {
        PageHelper.startPage(page.getPageNum(),page.getSize());
        List<Grading> list = gradingService.findAll();
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @PostMapping("/custom/list")
    public Result customList(@RequestBody Grading grading) {
        PageBean<Grading> page = new PageBean<Grading>();
    //        PageHelper.startPage(page.getPageNum(),page.getSize());
    Condition condition = new Condition(Grading.class);
    Example.Criteria criteria = condition.createCriteria();
    criteria.andLike("id","%1%");
    List<Grading> list = gradingService.findByCondition(condition);
        page.setList(list);
        return ResultGenerator.successResult(page);
    }
    @GetMapping("/changeFshop")
    public Result changeFshop(@RequestParam Integer id) {
        Grading grading = gradingService.findById(id);
        return ResultGenerator.successResult(grading);
    }

}
