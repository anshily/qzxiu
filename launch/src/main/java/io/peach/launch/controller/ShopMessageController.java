package io.peach.launch.controller;
import io.peach.launch.base.core.*;
import io.peach.launch.dto.CashOutDTO;
import io.peach.launch.dto.SubmitAll;
import io.peach.launch.model.Record;
import io.peach.launch.model.ShopMessage;
import io.peach.launch.model.User;
import io.peach.launch.model.UserRole;
import io.peach.launch.service.RecordService;
import io.peach.launch.service.ShopMessageService;
import com.github.pagehelper.PageHelper;
import io.peach.launch.service.UserRoleService;
import io.peach.launch.service.UserService;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.math.BigDecimal;
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
    @Resource
    private RecordService recordService;
    @Resource
    private UserRoleService userRoleService;

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

    @Transactional(propagation = Propagation.REQUIRED)
    @PostMapping("/saveUserAndShopMessageAndGrading")
    public Result saveUserAndShopMessageAndGrading(@RequestBody SubmitAll submitAll) {
          /*根据用户token获取用户的id*/
        User user=userService.getUserInfoByToken(submitAll.getToken());
        if (user == null){
            throw new ServiceException(5008,"用戶未登錄！");
        }
        if(!userService.getRoleNameByUserid(user.getId()).equals("总店管理员")){
            throw new ServiceException(5008,"无权限操作！");
        }
        /*先存储用户信息  返回用户id*/
        userService.save(submitAll.getUser());
        /*将返回的用户绑定一个普通店铺的身份*/
        UserRole userRole=new UserRole();
        userRole.setRid(2);
        userRole.setUid(submitAll.getUser().getId());
        userRoleService.save(userRole);
        /*将返回的用户id存入店铺信息中*/
        submitAll.getShopMessage().setUserid(submitAll.getUser().getId());
        /*将店铺信息存储到数据库中*/
        submitAll.getShopMessage().setUpdatetime(new Date());
        submitAll.getShopMessage().setCreatetime(new Date());
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

    @GetMapping("/getGoodShopMessage")
    public Result getGoodShopMessage() {
        List<ShopMessage> list = shopMessageService.getGoodShopList();
        Map<String,Object> map=new HashMap<>();
        map.put("goodShopList",list);
        return ResultGenerator.successResult(map);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    @PostMapping("/getCashOut")
    public Result getCashOut(@RequestBody CashOutDTO cashOutDTO) {

         /*先查询出当前店铺信息*/
        ShopMessage shopMessage=shopMessageService.findById(cashOutDTO.getShopid());

        if(cashOutDTO.getMoney().compareTo(shopMessage.getCashin())>0){
            throw new ServiceException(5007,"超出最大可体现金额！");
        }else{
            /*先更新店铺的佣金信息*/
            shopMessage.setUpdatetime(new Date());
            shopMessage.setCashout(shopMessage.getCashout().add(cashOutDTO.getMoney()));
            shopMessage.setCashin(shopMessage.getCashin().subtract(cashOutDTO.getMoney()));
            shopMessageService.update(shopMessage);
            /*再将提现记录插入到记录表中*/
            Record record=new Record();
            record.setMoney(cashOutDTO.getMoney());
            record.setShopid(cashOutDTO.getShopid());
            record.setSourceid(1);
            record.setType("佣金消息");
            record.setUpdatetime(new Date());
            record.setCreatetime(new Date());
            record.setImage(cashOutDTO.getImage());
            record.setSubscribe("您有一笔佣金已到账！请注意查收");
            recordService.save(record);

        }
        return ResultGenerator.successResult();
    }



}
