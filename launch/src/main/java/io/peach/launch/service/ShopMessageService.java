package io.peach.launch.service;
import io.peach.launch.dto.CashOutDTO;
import io.peach.launch.model.ShopMessage;
import io.peach.launch.base.core.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;


/**
 * Created by anshi on 2019/09/11.
 */
public interface ShopMessageService extends Service<ShopMessage> {

    void addGrading(int shopid,int recommendid,int positionid);
    void balanceMoney(int shopid, int recommendid, int positionid);
    List<Map<String,String>> getRecommendAndPosition();
    List<ShopMessage> getShopList();
    ShopMessage getFShopPerson(int shopid);
    ShopMessage getFShopPosition(int shopid);
    ShopMessage getShopMessageByid(int shopid);
    List<ShopMessage> getDailiList();

    List<ShopMessage> getChildShopMessage(int shopid);
    List<ShopMessage> getGoodShopList();
    /*void getCashOut(CashOutDTO cashOutDTO);*/

}
