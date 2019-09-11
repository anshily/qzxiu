package io.peach.launch.service.impl;

import io.peach.launch.dao.GradingMapper;
import io.peach.launch.model.Grading;
import io.peach.launch.service.GradingService;
import io.peach.launch.base.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by anshi on 2019/09/11.
 */
@Service
@Transactional
public class GradingServiceImpl extends AbstractService<Grading> implements GradingService {
    @Resource
    private GradingMapper qzxGradingMapper;

}
