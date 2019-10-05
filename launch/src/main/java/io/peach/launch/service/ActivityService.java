package io.peach.launch.service;
import io.peach.launch.model.Activity;
import io.peach.launch.base.core.Service;

import java.util.List;
import java.util.Map;


/**
 * Created by anshi on 2019/10/02.
 */
public interface ActivityService extends Service<Activity> {
    void deleteActivity(int id,String type);
    List<Map<String,String>> getActivityNameAndId();

}
