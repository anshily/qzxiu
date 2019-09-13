package io.peach.launch.service.impl;

import io.peach.launch.dao.ShopTypeMapper;
import io.peach.launch.model.ShopType;
import io.peach.launch.service.ShopTypeService;
import io.peach.launch.base.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by anshi on 2019/09/11.
 */
@Service
@Transactional
public class ShopTypeServiceImpl extends AbstractService<ShopType> implements ShopTypeService {
    @Resource
    private ShopTypeMapper qzxShopTypeMapper;

}
