package io.peach.launch.service.impl;

import io.peach.launch.dao.ShopMessageMapper;
import io.peach.launch.model.ShopMessage;
import io.peach.launch.service.ShopMessageService;
import io.peach.launch.base.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by anshi on 2019/09/11.
 */
@Service
@Transactional
public class ShopMessageServiceImpl extends AbstractService<ShopMessage> implements ShopMessageService {
    @Resource
    private ShopMessageMapper qzxShopMessageMapper;

}
