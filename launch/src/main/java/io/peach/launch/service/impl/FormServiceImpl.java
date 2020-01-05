package io.peach.launch.service.impl;

import io.peach.launch.dao.FormMapper;
import io.peach.launch.model.Form;
import io.peach.launch.service.FormService;
import io.peach.launch.base.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;


/**
 * Created by anshi on 2019/12/31.
 */
@Service
@Transactional
public class FormServiceImpl extends AbstractService<Form> implements FormService {
    @Resource
    private FormMapper qzxFormMapper;

    @Override
    public List<Form> getFormByStatu(int statu) {
        List<Form> list=qzxFormMapper.getFormByStatu(statu);
        return list;
    }
}
