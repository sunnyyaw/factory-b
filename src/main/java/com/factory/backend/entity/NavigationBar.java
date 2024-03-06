package com.factory.backend.entity;

import lombok.Data;

import java.io.Serializable;
@Data
public class NavigationBar implements Serializable {
    private Long id;
    private Long sort;
    private String name;
    private String href;
}
