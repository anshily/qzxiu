package io.peach.launch.service.impl;

import io.peach.launch.dao.PointMapper;
import io.peach.launch.model.Point;
import io.peach.launch.service.PointService;
import io.peach.launch.base.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by anshi on 2019/09/11.
 */
@Service
@Transactional
public class PointServiceImpl extends AbstractService<Point> implements PointService {
    @Resource
    private PointMapper qzxPointMapper;

}
