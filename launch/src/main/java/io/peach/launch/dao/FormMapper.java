package io.peach.launch.dao;

import io.peach.launch.base.core.Mapper;
import io.peach.launch.model.Form;

import java.util.List;

public interface FormMapper extends Mapper<Form> {
    List<Form> getFormByStatu(int statu);
}