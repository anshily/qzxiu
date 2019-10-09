package io.peach.launch.dao;

import io.peach.launch.base.core.Mapper;
import io.peach.launch.model.User;
import org.apache.ibatis.annotations.Param;

public interface UserMapper extends Mapper<User> {
    User getUserInfoByToken(String token);
    User nameExist(String name);
    User selectUserByOpenid(String openid);
    User getUserByPassword(@Param(value = "username") String username,@Param(value = "password") String password);
}