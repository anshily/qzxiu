package io.peach.launch.service.impl;

import io.peach.launch.dao.UserMapper;
import io.peach.launch.model.User;
import io.peach.launch.service.UserService;
import io.peach.launch.base.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by anshi on 2019/09/11.
 */
@Service
@Transactional
public class UserServiceImpl extends AbstractService<User> implements UserService {
    @Resource
    private UserMapper qzxUserMapper;

    @Override
    public User getUserInfoByToken(String token) {
        return qzxUserMapper.getUserInfoByToken(token);
    }

    @Override
    public Integer nameExist(String name) {
        User user=qzxUserMapper.nameExist(name);
        if(null==user){
            return 0;
        }
        return 1;
    }
}
