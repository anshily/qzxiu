package io.peach.launch.controller;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.model.Activity;
import io.peach.launch.service.ActivityService;
import io.peach.launch.base.core.PageBean;
import com.github.pagehelper.PageHelper;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.List;

/**
* Created by anshi on 2019/10/02.
*/
@RestController
@RequestMapping("/activity")
public class ActivityController {
    @Resource
    private ActivityService activityService;

    @PostMapping("/add")
    public Result add(@RequestBody Activity activity) {
        activityService.save(activity);
        return ResultGenerator.successResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestBody Integer id) {
        activityService.deleteById(id);
        return ResultGenerator.successResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody Activity activity) {
        activityService.update(activity);
        return ResultGenerator.successResult();
    }

    @GetMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        Activity activity = activityService.findById(id);
        return ResultGenerator.successResult(activity);
    }

    @GetMapping("/list")
    public Result list(PageBean<Activity> page) {
        PageHelper.startPage(page.getPageNum(),page.getSize());
        List<Activity> list = activityService.findAll();
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @PostMapping("/custom/list")
    public Result customList(@RequestBody Activity activity) {
        PageBean<Activity> page = new PageBean<Activity>();
    //        PageHelper.startPage(page.getPageNum(),page.getSize());
    Condition condition = new Condition(Activity.class);
    Example.Criteria criteria = condition.createCriteria();
    criteria.andLike("id","%1%");
    List<Activity> list = activityService.findByCondition(condition);
        page.setList(list);
        return ResultGenerator.successResult(page);
    }
}
