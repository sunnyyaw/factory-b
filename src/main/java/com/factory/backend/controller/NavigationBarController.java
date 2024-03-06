package com.factory.backend.controller;

import com.factory.backend.entity.NavigationBar;
import com.factory.backend.mapper.NavigationBarMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class NavigationBarController {
    @Autowired
    private NavigationBarMapper navigationBarMapper;
    @GetMapping("/navigationBar")
    public List<NavigationBar> all () {
        return navigationBarMapper.all();
    }
    @PostMapping("/navigationBar")
    public int add(@RequestBody NavigationBar navigationBar) {
        return navigationBarMapper.add(navigationBar);
    }
    @PutMapping("/navigationBar")
    public int update(@RequestBody NavigationBar navigationBar) {
        return navigationBarMapper.update(navigationBar);
    }
    @PutMapping("/navigationBar/sort")
    public int sort(@RequestBody List<Map<String,Long>> idSortList) {
        idSortList.forEach(id_sort -> {
            NavigationBar navigationBar = new NavigationBar();
            navigationBar.setId(id_sort.get("id"));
            navigationBar.setSort(id_sort.get("sort"));
            navigationBarMapper.update(navigationBar);
        });
        return idSortList.size();
    }
    @DeleteMapping("/navigationBar/{id}")
    public int remove(@PathVariable Long id) {
        return navigationBarMapper.remove(id);
    }
}
