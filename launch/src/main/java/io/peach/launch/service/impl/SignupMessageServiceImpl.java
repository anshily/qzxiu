package io.peach.launch.service.impl;

import io.peach.launch.dao.SignupMessageMapper;
import io.peach.launch.model.SignupMessage;
import io.peach.launch.service.SignupMessageService;
import io.peach.launch.base.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by anshi on 2019/09/11.
 */
@Service
@Transactional
public class SignupMessageServiceImpl extends AbstractService<SignupMessage> implements SignupMessageService {
    @Resource
    private SignupMessageMapper qzxSignupMessageMapper;

}
