package io.peach.launch.service;
import io.peach.launch.dto.ChangeGradingDTO;
import io.peach.launch.model.Grading;
import io.peach.launch.base.core.Service;
import org.springframework.web.bind.annotation.RequestBody;


/**
 * Created by anshi on 2019/09/11.
 */
public interface GradingService extends Service<Grading> {
    void changeGrading( ChangeGradingDTO changeGradingDTO);
    Integer getFshop(Integer shopid,String type);

}
