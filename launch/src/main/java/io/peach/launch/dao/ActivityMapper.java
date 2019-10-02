package io.peach.launch.dao;

import io.peach.launch.base.core.Mapper;
import io.peach.launch.model.Activity;
import org.apache.ibatis.annotations.Param;

public interface ActivityMapper extends Mapper<Activity> {
    void deleteActivity(@Param(value = "id") int id,@Param(value = "type") String type);
}