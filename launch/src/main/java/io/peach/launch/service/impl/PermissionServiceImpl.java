package io.peach.launch.service.impl;

import io.peach.launch.dao.PermissionMapper;
import io.peach.launch.model.Permission;
import io.peach.launch.service.PermissionService;
import io.peach.launch.base.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by anshi on 2019/09/11.
 */
@Service
@Transactional
public class PermissionServiceImpl extends AbstractService<Permission> implements PermissionService {
    @Resource
    private PermissionMapper qzxPermissionMapper;

}
