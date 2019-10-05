package io.peach.launch.base.utils.wechat;

import io.peach.launch.base.core.Constants;
import net.sf.json.JSONObject;

public class MpSDK {
    public static String code2Session(String code){
        String data = HttpCommonUtil.httpsRequest(Constants.WECHAT_CODE_SESSION + code,"GET", null);

        JSONObject sessionObj = JSONObject.fromObject(data);
        if (data != null && data.contains("openid")){
            return sessionObj.get("openid").toString();
        }else {
            throw new RuntimeException(data);
        }
    }
}
