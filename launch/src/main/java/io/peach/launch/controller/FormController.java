package io.peach.launch.controller;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.model.Form;
import io.peach.launch.model.Order;
import io.peach.launch.service.FormService;
import io.peach.launch.base.core.PageBean;
import com.github.pagehelper.PageHelper;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.List;

/**
* Created by anshi on 2019/12/31.
*/
@RestController
@RequestMapping("/form")
public class FormController {
    @Resource
    private FormService formService;

    @PostMapping("/add")
    public Result add(@RequestBody Form form) {
        formService.save(form);
        return ResultGenerator.successResult();
    }

    @GetMapping("/readOrDelete")
    public Result delete(@RequestParam Integer id,@RequestParam String type) {
        Form form = formService.findById(id);
        if("del".equals(type)){
            form.setStatu(0);
        }else{
            form.setStatu(2);
        }
        formService.update(form);
        return ResultGenerator.successResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody Form form) {
        formService.update(form);
        return ResultGenerator.successResult();
    }

    @GetMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        Form form = formService.findById(id);
        return ResultGenerator.successResult(form);
    }
    @GetMapping("/selectByStatu")
    public Result selectByStatu(@RequestParam Integer statu,@RequestParam Integer pi,@RequestParam Integer ps) {
        PageBean<Form> page = new PageBean<Form>();
        PageHelper.startPage(pi,ps);
        Condition condition = new Condition(Form.class);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andCondition("statu="+statu);
        List<Form> list = formService.findByCondition(condition);
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @GetMapping("/list")
    public Result list(PageBean<Form> page) {
        PageHelper.startPage(page.getPageNum(),page.getSize());
        List<Form> list = formService.findAll();
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @PostMapping("/custom/list")
    public Result customList(@RequestBody Form form) {
        PageBean<Form> page = new PageBean<Form>();
    //        PageHelper.startPage(page.getPageNum(),page.getSize());
    Condition condition = new Condition(Form.class);
    Example.Criteria criteria = condition.createCriteria();
    criteria.andLike("id","%1%");
    List<Form> list = formService.findByCondition(condition);
        page.setList(list);
        return ResultGenerator.successResult(page);
    }
}
