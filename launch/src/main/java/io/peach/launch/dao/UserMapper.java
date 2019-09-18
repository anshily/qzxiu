package io.peach.launch.dao;

import io.peach.launch.base.core.Mapper;
import io.peach.launch.model.User;

public interface UserMapper extends Mapper<User> {
    User getUserInfoByToken(String token);
    User nameExist(String name);
}