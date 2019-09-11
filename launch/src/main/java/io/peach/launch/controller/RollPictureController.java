package io.peach.launch.controller;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.model.RollPicture;
import io.peach.launch.service.RollPictureService;
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
@RequestMapping("/roll/picture")
public class RollPictureController {
    @Resource
    private RollPictureService rollPictureService;

    @PostMapping("/add")
    public Result add(@RequestBody RollPicture rollPicture) {
        rollPictureService.save(rollPicture);
        return ResultGenerator.successResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestBody Integer id) {
        rollPictureService.deleteById(id);
        return ResultGenerator.successResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody RollPicture rollPicture) {
        rollPictureService.update(rollPicture);
        return ResultGenerator.successResult();
    }

    @GetMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        RollPicture rollPicture = rollPictureService.findById(id);
        return ResultGenerator.successResult(rollPicture);
    }

    @GetMapping("/list")
    public Result list(PageBean<RollPicture> page) {
        PageHelper.startPage(page.getPageNum(),page.getSize());
        List<RollPicture> list = rollPictureService.findAll();
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @PostMapping("/custom/list")
    public Result customList(@RequestBody RollPicture rollPicture) {
        PageBean<RollPicture> page = new PageBean<RollPicture>();
    //        PageHelper.startPage(page.getPageNum(),page.getSize());
    Condition condition = new Condition(RollPicture.class);
    Example.Criteria criteria = condition.createCriteria();
    criteria.andLike("id","%1%");
    List<RollPicture> list = rollPictureService.findByCondition(condition);
        page.setList(list);
        return ResultGenerator.successResult(page);
    }
}
