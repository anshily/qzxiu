package io.peach.launch.controller;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.dto.SubmitAll;
import io.peach.launch.model.ShopMessage;
import io.peach.launch.service.ShopMessageService;
import io.peach.launch.base.core.PageBean;
import com.github.pagehelper.PageHelper;
import io.peach.launch.service.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.List;

/**
* Created by anshi on 2019/09/11.
*/
@RestController
@RequestMapping("/shop/message")
public class ShopMessageController {
    @Resource
    private ShopMessageService shopMessageService;
    @Resource
    private UserService userService;

    @PostMapping("/add")
    public Result add(@RequestBody ShopMessage shopMessage) {
        shopMessageService.save(shopMessage);
        return ResultGenerator.successResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestBody Integer id) {
        shopMessageService.deleteById(id);
        return ResultGenerator.successResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody ShopMessage shopMessage) {
        shopMessageService.update(shopMessage);
        return ResultGenerator.successResult();
    }

    @GetMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        ShopMessage shopMessage = shopMessageService.findById(id);
        return ResultGenerator.successResult(shopMessage);
    }

    @GetMapping("/list")
    public Result list(PageBean<ShopMessage> page) {
        PageHelper.startPage(page.getPageNum(),page.getSize());
        List<ShopMessage> list = shopMessageService.findAll();
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @PostMapping("/custom/list")
    public Result customList(@RequestBody ShopMessage shopMessage) {
        PageBean<ShopMessage> page = new PageBean<ShopMessage>();
    //        PageHelper.startPage(page.getPageNum(),page.getSize());
    Condition condition = new Condition(ShopMessage.class);
    Example.Criteria criteria = condition.createCriteria();
    criteria.andLike("id","%1%");
    List<ShopMessage> list = shopMessageService.findByCondition(condition);
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @PostMapping("/uploadPicture")
    public Result uploadPicture(HttpServletRequest request) {
         /*获取上传的文件*/
        MultipartHttpServletRequest req =(MultipartHttpServletRequest)request;
        MultipartFile multipartFile =  req.getFile("image");
        String path="";
        /*判断当前文件是否为空  如果不为空上传文件  如果为空存放默认图片*/
        if(multipartFile.getSize()>0){
            String uploadPath="/static/"+multipartFile.getOriginalFilename();
            File target=new File(uploadPath);
            try {
                multipartFile.transferTo(target);
            } catch (Exception e) {
                e.printStackTrace();
            }
            path=uploadPath;
        }else{
            path="/static/index.jpg";
        }
        return ResultGenerator.successResult(path);
    }

    @PostMapping("/saveUserAndShopMessageAndGrading")
    public Result saveUserAndShopMessageAndGrading(@RequestBody SubmitAll submitAll) {
        /*先存储用户信息  返回用户id*/
        userService.save(submitAll.getUser());
        /*将返回的用户id存入店铺信息中*/
        submitAll.getShopMessage().setUserid(submitAll.getUser().getId());
        /*将店铺信息存储到数据库中*/
        shopMessageService.save(submitAll.getShopMessage());
        /*将店铺id与两个推荐人的id一起传入service层进行分级处理*/
        shopMessageService.addGrading(submitAll.getShopMessage().getId(),submitAll.getRecommendID(),submitAll.getPositionID());
        return ResultGenerator.successResult();
    }
}
