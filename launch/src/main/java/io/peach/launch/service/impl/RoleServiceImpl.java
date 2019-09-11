package io.peach.launch.service.impl;

import io.peach.launch.dao.RoleMapper;
import io.peach.launch.model.Role;
import io.peach.launch.service.RoleService;
import io.peach.launch.base.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by anshi on 2019/09/11.
 */
@Service
@Transactional
public class RoleServiceImpl extends AbstractService<Role> implements RoleService {
    @Resource
    private RoleMapper qzxRoleMapper;

}
