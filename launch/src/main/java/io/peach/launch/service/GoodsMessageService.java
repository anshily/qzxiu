package io.peach.launch.service;
import io.peach.launch.model.GoodsMessage;
import io.peach.launch.base.core.Service;

import java.util.List;


/**
 * Created by anshi on 2019/09/11.
 */
public interface GoodsMessageService extends Service<GoodsMessage> {
    List<GoodsMessage> getGoodsList();

}
