package io.peach.launch.controller;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.base.core.ServiceException;
import io.peach.launch.model.RollPicture;
import io.peach.launch.model.User;
import io.peach.launch.service.RollPictureService;
import io.peach.launch.base.core.PageBean;
import com.github.pagehelper.PageHelper;
import io.peach.launch.service.UserService;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
* Created by anshi on 2019/09/11.
*/
@RestController
@RequestMapping("/roll/picture")
public class RollPictureController {
    @Resource
    private RollPictureService rollPictureService;
    @Resource
    private UserService userService;

    @PostMapping("/add")
    public Result add(@RequestBody RollPicture rollPicture) {
        rollPictureService.save(rollPicture);
        return ResultGenerator.successResult();
    }

    @GetMapping("/delete")
    public Result delete(@RequestParam Integer id) {
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

    /*获取已经上架的轮播图片*/
    @GetMapping("/rollPictureList")
    public Result rollPictureList() {
        Condition condition = new Condition(RollPicture.class);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andCondition("isputon=1");
        criteria.andCondition("isdelete=0");
        List<RollPicture> list = rollPictureService.findByCondition(condition);
        /*Map<String,Object> map=new HashMap<>();
        map.put("rollPictureList",list);*/
        return ResultGenerator.successResult(list);
    }
    /*将当前轮播图删除*/
    @GetMapping("/deletePicture")
    public Result deletePicture(@RequestParam Integer id) {
        rollPictureService.deletePicture(id);
        return ResultGenerator.successResult();
    }

    /*将当前轮播图下架*/
    @GetMapping("/putDownPicture")
    public Result putDownPicture(@RequestParam Integer id) {
        rollPictureService.putDownPicture(id);
        return ResultGenerator.successResult();
    }
    /*将当前轮播图上架*/
    @GetMapping("/putOnPicture")
    public Result putOnPicture(@RequestParam Integer id,@RequestParam String token) {
          /*根据用户token获取用户的id*/
        User user=userService.getUserInfoByToken(token);
        if (user == null){
            throw new ServiceException(5008,"用戶未登錄！");
        }
        rollPictureService.putOnPicture(id);
        return ResultGenerator.successResult();
    }

}
