package com.vit.hostel.management.service;

import com.vit.hostel.management.dtos.FoodMenuDTO;
import org.springframework.http.RequestEntity;

import java.util.List;
import java.util.Map;

public interface FoodMenuService {

    Map<String, Map<String, String>> getFoodMenuDetails();
}
