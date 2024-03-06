package com.factory.backend.controller;

import com.factory.backend.entity.NavigationBar;
import com.factory.backend.mapper.NavigationBarMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @DeleteMapping("/navigationBar/{id}")
    public int remove(@PathVariable Long id) {
        return navigationBarMapper.remove(id);
    }
}
