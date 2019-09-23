package io.peach.launch.service.impl;

import io.peach.launch.dao.GoodsMessageMapper;
import io.peach.launch.model.GoodsMessage;
import io.peach.launch.service.GoodsMessageService;
import io.peach.launch.base.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;


/**
 * Created by anshi on 2019/09/11.
 */
@Service
@Transactional
public class GoodsMessageServiceImpl extends AbstractService<GoodsMessage> implements GoodsMessageService {
    @Resource
    private GoodsMessageMapper qzxGoodsMessageMapper;

    @Override
    public List<GoodsMessage> getGoodsList() {
        List<GoodsMessage> list=qzxGoodsMessageMapper.getGoodsList();
        return list;
    }
}
