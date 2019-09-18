package io.peach.launch.controller;

import io.peach.launch.base.core.Constants;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@RestController
public class AnshiTestController {

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
}
