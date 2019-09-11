package io.peach.launch.controller;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.model.UserRole;
import io.peach.launch.service.UserRoleService;
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
@RequestMapping("/user/role")
public class UserRoleController {
    @Resource
    private UserRoleService userRoleService;

    @PostMapping("/add")
    public Result add(@RequestBody UserRole userRole) {
        userRoleService.save(userRole);
        return ResultGenerator.successResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestBody Integer id) {
        userRoleService.deleteById(id);
        return ResultGenerator.successResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody UserRole userRole) {
        userRoleService.update(userRole);
        return ResultGenerator.successResult();
    }

    @GetMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        UserRole userRole = userRoleService.findById(id);
        return ResultGenerator.successResult(userRole);
    }

    @GetMapping("/list")
    public Result list(PageBean<UserRole> page) {
        PageHelper.startPage(page.getPageNum(),page.getSize());
        List<UserRole> list = userRoleService.findAll();
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @PostMapping("/custom/list")
    public Result customList(@RequestBody UserRole userRole) {
        PageBean<UserRole> page = new PageBean<UserRole>();
    //        PageHelper.startPage(page.getPageNum(),page.getSize());
    Condition condition = new Condition(UserRole.class);
    Example.Criteria criteria = condition.createCriteria();
    criteria.andLike("id","%1%");
    List<UserRole> list = userRoleService.findByCondition(condition);
        page.setList(list);
        return ResultGenerator.successResult(page);
    }
}
