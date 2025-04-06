package com.vit.hostel.management.service.impl;

import com.vit.hostel.management.dtos.FoodMenuDTO;
import com.vit.hostel.management.entities.FoodMenuEntity;
import com.vit.hostel.management.repository.FoodMenuRepository;
import com.vit.hostel.management.service.FoodMenuService;
import org.springframework.http.RequestEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class FoodMenuServiceImpl implements FoodMenuService {
    private final FoodMenuRepository foodMenuRepository;
    FoodMenuServiceImpl(FoodMenuRepository foodMenuRepository){
        this.foodMenuRepository = foodMenuRepository;
    }

    @Override
    public Map<String, Map<String, String>> getFoodMenuDetails() {
        List<FoodMenuEntity> entities = foodMenuRepository.findAll();
        Map<String, Map<String, String>> menuMap = new LinkedHashMap<>();
        entities.forEach((item) -> {
            String day = item.getDay();
            String mealType = item.getMealType().name();
            String foodItems = item.getFoodItems();

            menuMap.putIfAbsent(day,new HashMap<>());

            menuMap.get(day).put(mealType, foodItems);
        });
        return menuMap;
    }
}
