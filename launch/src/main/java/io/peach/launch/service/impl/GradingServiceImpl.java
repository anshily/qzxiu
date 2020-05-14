package io.peach.launch.service.impl;

import io.peach.launch.dao.GradingMapper;
import io.peach.launch.dto.ChangeGradingDTO;
import io.peach.launch.model.Grading;
import io.peach.launch.service.GradingService;
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
public class GradingServiceImpl extends AbstractService<Grading> implements GradingService {
    @Resource
    private GradingMapper qzxGradingMapper;

    @Override
    public void changeGrading(ChangeGradingDTO changeGradingDTO) {
        /*1:根据待移动的shopid以及改变类别查询出当前店铺的父类店铺是谁*/
        Integer Fshopid=qzxGradingMapper.selectFShopIdByTypeAndShopid(changeGradingDTO.getWaitShopid(),changeGradingDTO.getChangeType());
        /*2：首先查询出待移动的shopid的所有同类别的子类店铺*/
        List<Integer> list=qzxGradingMapper.getChildShopIdByTypeAndFshopid(changeGradingDTO.getWaitShopid(),changeGradingDTO.getChangeType());
        /*3：将所有子类店铺的同类别的上级父类全部改成待移动的店铺的同类别上级*/
        for (Integer i:list) {
            qzxGradingMapper.updateFshopidSameType(i,changeGradingDTO.getChangeType(),Fshopid);
        }
        /*4：将目标id的原父级店铺取消  add by anshi 2020/5/14 */
        qzxGradingMapper.cancelOriginFShopIdByTypeAndShopid(changeGradingDTO.getWaitShopid(),changeGradingDTO.getChangeType());

        /*4：将目标id的指定类别下添加一个子类*/
        qzxGradingMapper.insertCodeSameType(changeGradingDTO.getWaitShopid(),changeGradingDTO.getChangeType(),changeGradingDTO.getTargetShopid());
    }

    @Override
    public Integer getFshop(Integer shopid, String type) {
        Integer i=qzxGradingMapper.selectFShopIdByTypeAndShopid(shopid, type);
        return i;
    }
}
