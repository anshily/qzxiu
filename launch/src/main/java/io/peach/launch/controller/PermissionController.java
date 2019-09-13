package io.peach.launch.controller;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.model.Permission;
import io.peach.launch.service.PermissionService;
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
@RequestMapping("/permission")
public class PermissionController {
    @Resource
    private PermissionService permissionService;

    @PostMapping("/add")
    public Result add(@RequestBody Permission permission) {
        permissionService.save(permission);
        return ResultGenerator.successResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestBody Integer id) {
        permissionService.deleteById(id);
        return ResultGenerator.successResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody Permission permission) {
        permissionService.update(permission);
        return ResultGenerator.successResult();
    }

    @GetMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        Permission permission = permissionService.findById(id);
        return ResultGenerator.successResult(permission);
    }

    @GetMapping("/list")
    public Result list(PageBean<Permission> page) {
        PageHelper.startPage(page.getPageNum(),page.getSize());
        List<Permission> list = permissionService.findAll();
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @PostMapping("/custom/list")
    public Result customList(@RequestBody Permission permission) {
        PageBean<Permission> page = new PageBean<Permission>();
    //        PageHelper.startPage(page.getPageNum(),page.getSize());
    Condition condition = new Condition(Permission.class);
    Example.Criteria criteria = condition.createCriteria();
    criteria.andLike("id","%1%");
    List<Permission> list = permissionService.findByCondition(condition);
        page.setList(list);
        return ResultGenerator.successResult(page);
    }
}
