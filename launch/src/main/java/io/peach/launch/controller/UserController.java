package io.peach.launch.controller;
import io.peach.launch.base.core.*;
import io.peach.launch.base.utils.wechat.MpSDK;
import io.peach.launch.dto.UserDTO;
import io.peach.launch.model.ShopMessage;
import io.peach.launch.model.User;
import io.peach.launch.model.UserRole;
import io.peach.launch.service.UserRoleService;
import io.peach.launch.service.UserService;
import com.github.pagehelper.PageHelper;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
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
    @Resource
    private UserRoleService userRoleService;

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
       /* List<User> users =  userService.selectByCSql("username=" + user.getUsername() + " and password=" + user.getPassword());*/

        User u= userService.getUserByPassword(user.getUsername(),user.getPassword());
        if (null!=u){
            String newToken = UUID.randomUUID().toString();
            u.setToken(newToken);
            u.setUpdate_time(new Date());
            userService.update(u);
            /*根据用户id查询出用户的角色对象*/
            String role=userService.getRoleNameByUserid(u.getId());
            Map<String,Object> map = new HashMap<String,Object>();
            map.put("token",newToken);
            map.put("id",u.getId());
            map.put("roleName",role);
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
    @Transactional(propagation = Propagation.REQUIRED)
    @GetMapping("/accordingCodeGetToken")
    public Result getToken(@RequestParam String code) {
        Map<String,Object> map=new HashMap<>();
        String openid= MpSDK.code2Session(code);
        /*查詢出當前用戶列表中是否有當前的openid*/
        Condition condition = new Condition(User.class);
        Example.Criteria criteria = condition.createCriteria();
//        criteria.andLike("openid",openid);
        criteria.andEqualTo("open_id",openid);
        List<User> list = userService.findByCondition(condition);
        if(list.size()!=0){
            /*有對象，獲取當前對象的token 返回*/
            map.put("id",list.get(0).getId());
            map.put("token",list.get(0).getToken());
            map.put("rolename",userService.getRoleNameByUserid(list.get(0).getId()));
            return ResultGenerator.successResult(map);
        }else{
            /*沒有當前對象  創建一個新的對象，然後動態賦值一個token*/
            User user=new User();
            String token=UUID.randomUUID().toString();
            user.setOpen_id(openid);
            user.setToken(token);
            userService.save(user);
            /*将游客角色绑定到当前用户上*/
            UserRole userRole=new UserRole();
            userRole.setRid(3);
            userRole.setUid(user.getId());
            userRoleService.save(userRole);
            map.put("id",user.getId());
            map.put("token",token);
            map.put("rolename","游客");
            return ResultGenerator.successResult(map);
        }
    }
    @GetMapping("/accordingTokenGetShop")
    public Result accordingTokenGetShop(@RequestParam String token) {
        /*先根据token查询出有没有对应的店铺id*/
        ShopMessage shopMessage=userService.getShopMessageByToken(token);
        return ResultGenerator.successResult(shopMessage);
    }

    /*用戶通過用戶名密碼登錄時將openid與用戶賬號綁定*/
    @PostMapping("/bangding")
    public Result bangding(@RequestBody UserDTO userDTO) {
        String openid= MpSDK.code2Session(userDTO.getCode());
        /*首先根據openid查詢用戶信息*/
        User user1=userService.selectUserByOpenid(openid);
        User user2=userService.getUserByPassword(userDTO.getUsername(),userDTO.getPassword());
        /*判斷兩個用戶的id是否為同一個id*/
        if(user1.getId()==user2.getId()){
            /*如果相等，不做操作*/
            return ResultGenerator.successResult(user1.getToken());
        }else{
            String newToken = UUID.randomUUID().toString();
         /*如果两个不相等，将user1的openid给user2*/
            user2.setOpen_id(user1.getOpen_id());
            user2.setToken(newToken);
            userService.update(user2);
            /*将user1删除*/
            userService.delete(user1);
            return ResultGenerator.successResult(user2.getToken());
        }
    }
    @PostMapping("/loginByUsernameAndPassword")
    public Result loginByUsernameAndPassword(@RequestParam String username,@RequestParam String password) {
        User user=userService.getUserByPassword(username, password);
        if(null==user){
            throw new ServiceException(5009,"用户名或密码错误");
        }else{
            return ResultGenerator.successResult(user.getToken());
        }

    }

}
