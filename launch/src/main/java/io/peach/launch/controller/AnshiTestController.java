package io.peach.launch.controller;

import io.peach.launch.base.core.Constants;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.base.core.ServiceException;
import io.peach.launch.base.utils.UploadFile;
import io.peach.launch.base.utils.wechat.MpSDK;
import io.peach.launch.model.Grading;
import io.peach.launch.model.User;
import io.peach.launch.service.UserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

import static io.peach.launch.base.utils.wechat.MpSDK.code2Session;

@RestController
public class AnshiTestController {

    @Resource
    private UserService userService;

    protected static String getDate() {
        Date currentTime = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        return simpleDateFormat.format(currentTime);
    }

    @RequestMapping("/anshi/mp/upload")
    public Result upload(HttpServletRequest request) throws Exception {

        System.out.println("upload");
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
        InputStream in = request.getPart("file").getInputStream();
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
    }

    @RequestMapping("/anshi/upload/base")
    public Result uploadBase64(String flie) throws Exception {

        String img = UploadFile.uploadSingleBase64(flie);

        return ResultGenerator.successResult(img);
    }

    @RequestMapping("/anshi/mpLogin")
    public Result mpLogin(String code) throws Exception {

        String res = MpSDK.code2Session(code);

        System.out.println(res);

        return ResultGenerator.successResult(res);
    }
    @RequestMapping("/anshi/mpRegister")
    public Result mpRegister(String code) throws Exception {

        String openid = MpSDK.code2Session(code);

        Condition condition = new Condition(User.class);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andEqualTo("open_id", openid);
        List<User> list = userService.findByCondition(condition);

        if (list.size() > 0){
            throw new  ServiceException(5010, "用户已存在");
        }

        String newToken = UUID.randomUUID().toString();
        User user = new User();

        user.setOpen_id(openid);
        user.setToken(newToken);

        userService.save(user);
        Map<String, Object> map = new HashMap<>();
        map.put("id", user.getId());
        map.put("token",newToken);
        return ResultGenerator.successResult();
    }
}
