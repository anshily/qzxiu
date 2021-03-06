package io.peach.launch.service.impl;

import io.peach.launch.dao.RollPictureMapper;
import io.peach.launch.model.RollPicture;
import io.peach.launch.service.RollPictureService;
import io.peach.launch.base.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by anshi on 2019/09/11.
 */
@Service
@Transactional
public class RollPictureServiceImpl extends AbstractService<RollPicture> implements RollPictureService {
    @Resource
    private RollPictureMapper qzxRollPictureMapper;

    @Override
    public void deletePicture(Integer id) {
        qzxRollPictureMapper.deletePicture(id);
    }

    @Override
    public void putDownPicture(Integer id) {
        qzxRollPictureMapper.putDownPicture(id);
    }

    @Override
    public void putOnPicture(Integer id) {
        qzxRollPictureMapper.putOnPicture(id);
    }
}
