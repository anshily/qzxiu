package io.peach.launch.service;
import io.peach.launch.model.GoodsMessage;
import io.peach.launch.base.core.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;


/**
 * Created by anshi on 2019/09/11.
 */
public interface GoodsMessageService extends Service<GoodsMessage> {
    List<GoodsMessage> getGoodsList();
    void goodsUpOrDown( Integer id, String type);

}
