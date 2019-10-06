package io.peach.launch.service.impl;

import io.peach.launch.dao.ActivityMapper;
import io.peach.launch.model.Activity;
import io.peach.launch.service.ActivityService;
import io.peach.launch.base.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;


/**
 * Created by anshi on 2019/10/02.
 */
@Service
@Transactional
public class ActivityServiceImpl extends AbstractService<Activity> implements ActivityService {
    @Resource
    private ActivityMapper qzxActivityMapper;

    @Override
    public void deleteActivity(int id,String type) {
        qzxActivityMapper.deleteActivity(id, type);
    }

    @Override
    public List<Map<String,String>> getActivityNameAndId() {
        List<Map<String,String>> list=qzxActivityMapper.getActivityNameAndId();
        return list;
    }
}
