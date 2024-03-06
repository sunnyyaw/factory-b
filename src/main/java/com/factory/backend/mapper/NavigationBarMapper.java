package com.factory.backend.mapper;

import com.factory.backend.entity.NavigationBar;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NavigationBarMapper {
    List<NavigationBar> all();
    int add(NavigationBar navigationBar);
    int remove(Long id);
    int update(NavigationBar navigationBar);
}
