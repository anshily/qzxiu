package io.peach.launch.service;
import io.peach.launch.model.ShopMessage;
import io.peach.launch.base.core.Service;


/**
 * Created by anshi on 2019/09/11.
 */
public interface ShopMessageService extends Service<ShopMessage> {

    void addGrading(int shopid,int recommendid,int positionid);
}
