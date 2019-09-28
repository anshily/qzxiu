package io.peach.launch.service;
import io.peach.launch.model.ShopMessage;
import io.peach.launch.base.core.Service;

import java.util.List;
import java.util.Map;


/**
 * Created by anshi on 2019/09/11.
 */
public interface ShopMessageService extends Service<ShopMessage> {

    void addGrading(int shopid,int recommendid,int positionid);
    void balanceMoney(int shopid,int recommendid,int positionid);
    List<Map<String,String>> getRecommendAndPosition();
    List<ShopMessage> getShopList();
    ShopMessage getFShopPerson(int shopid);
    ShopMessage getFShopPosition(int shopid);
    List<ShopMessage> getChildShopMessage(int shopid);

}
