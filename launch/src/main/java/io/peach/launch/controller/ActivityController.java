package io.peach.launch.controller;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.base.core.ServiceException;
import io.peach.launch.dto.ActivityDTO;
import io.peach.launch.model.Activity;
import io.peach.launch.model.User;
import io.peach.launch.service.ActivityService;
import io.peach.launch.base.core.PageBean;
import com.github.pagehelper.PageHelper;
import io.peach.launch.service.UserService;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;

/**
* Created by anshi on 2019/10/02.
*/
@RestController
@RequestMapping("/activity")
public class ActivityController {
    @Resource
    private ActivityService activityService;
    @Resource
    private UserService userService;

    @PostMapping("/add")
    public Result add(@RequestBody ActivityDTO activityDTO) {
         /*根据用户token获取用户的id*/
        User user=userService.getUserInfoByToken(activityDTO.getToken());
        if (user == null){
            throw new ServiceException(5008,"用戶未登錄！");
        }
        activityService.save(activityDTO.getActivity());
        return ResultGenerator.successResult();
    }

    @PostMapping("/changeStatu")
    public Result delete(@RequestParam Integer id,@RequestParam String type) {
        activityService.deleteActivity(id,type);
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

    @GetMapping("/delete")
    public Result delete(@RequestParam @NotNull Integer id) {
        activityService.deleteById(id);
//        Activity activity = activityService.findById(id);
        return ResultGenerator.successResult();
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

    @GetMapping("/getActivityListByStatu")
    public Result getActivityListByStatu(@RequestParam Integer statu) {
        Condition condition = new Condition(Activity.class);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andCondition("statu="+statu);
        List<Activity> list = activityService.findByCondition(condition);
        return ResultGenerator.successResult(list);
    }
    /*获取活动名称以及id*/
    @GetMapping("/getActivityNameAndId")
    public Result getActivityNameAndId() {
        List<Map<String,String>> map = activityService.getActivityNameAndId();
        return ResultGenerator.successResult(map);
    }

}
