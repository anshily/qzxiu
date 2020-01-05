package io.peach.launch.service;
import io.peach.launch.model.Form;
import io.peach.launch.base.core.Service;

import java.util.List;


/**
 * Created by anshi on 2019/12/31.
 */
public interface FormService extends Service<Form> {

    List<Form> getFormByStatu(int statu);
}
