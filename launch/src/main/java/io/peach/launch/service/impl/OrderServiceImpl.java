package io.peach.launch.service.impl;

import io.peach.launch.dao.OrderMapper;
import io.peach.launch.model.Order;
import io.peach.launch.service.OrderService;
import io.peach.launch.base.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by anshi on 2019/09/11.
 */
@Service
@Transactional
public class OrderServiceImpl extends AbstractService<Order> implements OrderService {
    @Resource
    private OrderMapper qzxOrderMapper;

}
