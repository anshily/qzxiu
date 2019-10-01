package io.peach.launch.dao;

import io.peach.launch.base.core.Mapper;
import io.peach.launch.model.RollPicture;

public interface RollPictureMapper extends Mapper<RollPicture> {
    void deletePicture(Integer id);
    void putDownPicture(Integer id);
    void putOnPicture(Integer id);
}