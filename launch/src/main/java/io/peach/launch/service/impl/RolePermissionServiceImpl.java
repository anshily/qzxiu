package io.peach.launch.service.impl;

import io.peach.launch.dao.RolePermissionMapper;
import io.peach.launch.model.RolePermission;
import io.peach.launch.service.RolePermissionService;
import io.peach.launch.base.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by anshi on 2019/09/11.
 */
@Service
@Transactional
public class RolePermissionServiceImpl extends AbstractService<RolePermission> implements RolePermissionService {
    @Resource
    private RolePermissionMapper qzxRolePermissionMapper;

}
