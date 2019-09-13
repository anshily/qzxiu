package io.peach.launch.service.impl;

import io.peach.launch.dao.OrderMessageMapper;
import io.peach.launch.model.OrderMessage;
import io.peach.launch.service.OrderMessageService;
import io.peach.launch.base.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by anshi on 2019/09/11.
 */
@Service
@Transactional
public class OrderMessageServiceImpl extends AbstractService<OrderMessage> implements OrderMessageService {
    @Resource
    private OrderMessageMapper qzxOrderMessageMapper;

}
