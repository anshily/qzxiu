package io.peach.launch.service.impl;

import io.peach.launch.dao.UserRoleMapper;
import io.peach.launch.model.UserRole;
import io.peach.launch.service.UserRoleService;
import io.peach.launch.base.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by anshi on 2019/09/11.
 */
@Service
@Transactional
public class UserRoleServiceImpl extends AbstractService<UserRole> implements UserRoleService {
    @Resource
    private UserRoleMapper qzxUserRoleMapper;

}
