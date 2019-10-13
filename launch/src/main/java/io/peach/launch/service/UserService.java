package io.peach.launch.service;
import io.peach.launch.model.User;
import io.peach.launch.base.core.Service;


/**
 * Created by anshi on 2019/09/11.
 */
public interface UserService extends Service<User> {
    User getUserInfoByToken(String token);
    Integer nameExist(String name);
    User selectUserByOpenid(String openid);
    User getUserByPassword(String username,String password);
    String getRoleNameByUserid(int id);
}
