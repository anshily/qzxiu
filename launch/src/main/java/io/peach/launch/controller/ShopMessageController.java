package io.peach.launch.controller;
import io.peach.launch.base.core.Constants;
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
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

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

    protected static String getDate() {
        Date currentTime = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        return simpleDateFormat.format(currentTime);
    }

    @PostMapping("/uploadPicture")
    public Result uploadPicture(HttpServletRequest request) throws Exception {

        request.setCharacterEncoding("utf-8");  //设置编码

        String randomName = UUID.randomUUID().toString() + ".jpg";
        String imageName = getDate() + "/" + randomName;
        //服务器真正存放的路径
        String fileName = Constants.PATH_IMAGE_PATH + imageName;
        // 保存图片到本地
        File file = new File(fileName);
        if (!file.getParentFile().exists()) {
            file.getParentFile().mkdirs();
        }

        OutputStream out = new FileOutputStream(file);
        InputStream in = request.getPart("image").getInputStream();
        int length = 0;
        byte[] buf = new byte[1024];
//             in.read(buf); 每次读到的数据存放在buf 数组中
        while ((length = in.read(buf)) != -1) {
//                //在buf数组中取出数据写到（输出流）磁盘上
            out.write(buf, 0, length);
        }
        in.close();
        out.close();

        return ResultGenerator.successResult(fileName);
//
//         /*获取上传的文件*/
//        MultipartHttpServletRequest req =(MultipartHttpServletRequest)request;
//        MultipartFile multipartFile =  req.getFile("image");
//        String path="";
//        /*判断当前文件是否为空  如果不为空上传文件  如果为空存放默认图片*/
//        if(multipartFile.getSize()>0){
//            String uploadPath="/static/"+multipartFile.getOriginalFilename();
//            File target=new File(uploadPath);
//            try {
//                multipartFile.transferTo(target);
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//            path=uploadPath;
//        }else{
//            path="/static/index.jpg";
//        }
//        return ResultGenerator.successResult(path);
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
        /*分完级后结算酬金*/
        shopMessageService.balanceMoney(submitAll.getShopMessage().getId(),submitAll.getRecommendID(),submitAll.getPositionID());
        return ResultGenerator.successResult();
    }

    /*页面刷新出所有人员推荐以及地区推荐  格式是人名+店铺名+代理名称*/
    @GetMapping("/getRecommendAndPosition")
    public Result getRecommendAndPosition() {
        List<Map<String,String>> list=shopMessageService.getRecommendAndPosition();
        return ResultGenerator.successResult(list);
    }

    @GetMapping("/getShopList")
    public Result getShopList(PageBean<ShopMessage> page) {
        PageHelper.startPage(page.getPageNum(),page.getSize());
        List<ShopMessage> list=shopMessageService.getShopList();
        page.setList(list);
        /*Map<String,Object> map=new HashMap<>();
        map.put("shopList",list);*/
        return ResultGenerator.successResult(page);
    }

    @GetMapping("/getFShopMessage")
    public Result getFShopMessage(@RequestParam Integer shopid) {
        ShopMessage person=shopMessageService.getFShopPerson(shopid);
        ShopMessage position=shopMessageService.getFShopPosition(shopid);
        Map<String,Object> map=new HashMap<>();
        map.put("person",person);
        map.put("position",position);
        return ResultGenerator.successResult(map);
    }
    @GetMapping("/getChildShopMessage")
    public Result getChildShopMessage(@RequestParam Integer shopid) {
        List<ShopMessage> list=shopMessageService.getChildShopMessage(shopid);
        Map<String,Object> map=new HashMap<>();
        map.put("child",list);
        return ResultGenerator.successResult(map);
    }

}
