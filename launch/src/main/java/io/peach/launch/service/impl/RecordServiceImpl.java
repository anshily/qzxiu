package io.peach.launch.service.impl;

import io.peach.launch.dao.RecordMapper;
import io.peach.launch.model.Record;
import io.peach.launch.service.RecordService;
import io.peach.launch.base.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by anshi on 2019/09/23.
 */
@Service
@Transactional
public class RecordServiceImpl extends AbstractService<Record> implements RecordService {
    @Resource
    private RecordMapper qzxRecordMapper;

}
