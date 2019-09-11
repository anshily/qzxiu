package io.peach.launch.controller;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.model.SignupMessage;
import io.peach.launch.service.SignupMessageService;
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
@RequestMapping("/signup/message")
public class SignupMessageController {
    @Resource
    private SignupMessageService signupMessageService;

    @PostMapping("/add")
    public Result add(@RequestBody SignupMessage signupMessage) {
        signupMessageService.save(signupMessage);
        return ResultGenerator.successResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestBody Integer id) {
        signupMessageService.deleteById(id);
        return ResultGenerator.successResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody SignupMessage signupMessage) {
        signupMessageService.update(signupMessage);
        return ResultGenerator.successResult();
    }

    @GetMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        SignupMessage signupMessage = signupMessageService.findById(id);
        return ResultGenerator.successResult(signupMessage);
    }

    @GetMapping("/list")
    public Result list(PageBean<SignupMessage> page) {
        PageHelper.startPage(page.getPageNum(),page.getSize());
        List<SignupMessage> list = signupMessageService.findAll();
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @PostMapping("/custom/list")
    public Result customList(@RequestBody SignupMessage signupMessage) {
        PageBean<SignupMessage> page = new PageBean<SignupMessage>();
    //        PageHelper.startPage(page.getPageNum(),page.getSize());
    Condition condition = new Condition(SignupMessage.class);
    Example.Criteria criteria = condition.createCriteria();
    criteria.andLike("id","%1%");
    List<SignupMessage> list = signupMessageService.findByCondition(condition);
        page.setList(list);
        return ResultGenerator.successResult(page);
    }
}
