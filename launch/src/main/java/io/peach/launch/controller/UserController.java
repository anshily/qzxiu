package io.peach.launch.controller;
import io.peach.launch.base.core.*;
import io.peach.launch.base.utils.wechat.MpSDK;
import io.peach.launch.model.User;
import io.peach.launch.service.UserService;
import com.github.pagehelper.PageHelper;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.*;

/**
* Created by anshi on 2019/09/11.
*/
@RestController
@RequestMapping("/user")
public class UserController {
    @Resource
    private UserService userService;

    @GetMapping("/userInfo")
    public Result userInfo(@RequestParam String token){
        User user = userService.getUserInfoByToken(token);
        return ResultGenerator.successResult(user);
    }

    @PostMapping("/add")
    public Result add(@RequestBody User user) {
        userService.save(user);
        return ResultGenerator.successResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestBody Integer id) {
        userService.deleteById(id);
        return ResultGenerator.successResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody User user) {
        userService.update(user);
        return ResultGenerator.successResult();
    }

    @GetMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        User user = userService.findById(id);
        return ResultGenerator.successResult(user);
    }

    @GetMapping("/list")
    public Result list(PageBean<User> page) {
        PageHelper.startPage(page.getPageNum(),page.getSize());
        List<User> list = userService.findAll();
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @PostMapping("/custom/list")
    public Result customList(@RequestBody User user) {
        PageBean<User> page = new PageBean<User>();
    //        PageHelper.startPage(page.getPageNum(),page.getSize());
    Condition condition = new Condition(User.class);
    Example.Criteria criteria = condition.createCriteria();
    criteria.andLike("id","%1%");
    List<User> list = userService.findByCondition(condition);
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @PostMapping("/login")
    public Result login(@RequestBody User user) {

        //账号密码不能为空
        if(user.getUsername() == null || user.getUsername().isEmpty())
        {
            throw new ServiceException(Constants.CODE_ERR_USER_NAME);
        }
        if( user.getPassword() == null || user.getPassword().isEmpty())
        {
            throw new ServiceException(Constants.CODE_ERR_USER_NAME);
        }
        List<User> users =  userService.selectByCSql("username=" + user.getUsername() + " and password=" + user.getPassword());
        if (users.size() > 0){
            String newToken = UUID.randomUUID().toString();

            User user1 = users.get(0);
            user1.setToken(newToken);
            user1.setUpdate_time(new Date());
            userService.update(user1);
            Map<String,Object> map = new HashMap<String,Object>();
            map.put("token",newToken);
            return ResultGenerator.successResult(map);
        }else {
            return ResultGenerator.errResult(5001, "用户名密码错误");
        }
    }

    @GetMapping("/nameExist")
    public Result nameExist(@RequestParam String name) {
        Integer code=userService.nameExist(name);
        return ResultGenerator.successResult(code);
    }
    @GetMapping("/getToken")
    public Result getToken(@RequestParam String code) {
        String openid= MpSDK.code2Session(code);
        /*查詢出當前用戶列表中是否有當前的openid*/
        Condition condition = new Condition(User.class);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andLike("openid=",openid);
        List<User> list = userService.findByCondition(condition);
        if(list.size()!=0){
            /*有對象，獲取當前對象的token 返回*/
            return ResultGenerator.successResult(list.get(0).getToken());
        }
        return ResultGenerator.successResult(code);
    }
}
