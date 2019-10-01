package io.peach.launch.service;
import io.peach.launch.model.RollPicture;
import io.peach.launch.base.core.Service;
import org.springframework.web.bind.annotation.RequestParam;


/**
 * Created by anshi on 2019/09/11.
 */
public interface RollPictureService extends Service<RollPicture> {


    void deletePicture(Integer id);
    void putDownPicture(Integer id);
    void putOnPicture(Integer id);
}
