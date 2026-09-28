package com.vit.hostel.management.service.impl;

import com.vit.hostel.management.dtos.FoodMenuDTO;
import com.vit.hostel.management.entities.FoodMenuEntity;
import com.vit.hostel.management.repository.FoodMenuRepository;
import com.vit.hostel.management.service.FoodMenuService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.RequestEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class FoodMenuServiceImpl implements FoodMenuService {
    private final FoodMenuRepository foodMenuRepository;
    FoodMenuServiceImpl(FoodMenuRepository foodMenuRepository){
        this.foodMenuRepository = foodMenuRepository;
    }

    @Override
    public Map<String, Map<String, String>> getFoodMenuDetails() {
        log.info("starting food menu function...");
        List<FoodMenuEntity> entities = foodMenuRepository.findAll();
        entities.forEach(item -> {
            System.out.println("Fetched mealType from DB: " + item.getMealType());
            // The value logged here should be something like "BREAKFAST", "LUNCH", etc.
        });
        log.info("Got the food entities ");
        Map<String, Map<String, String>> menuMap = new LinkedHashMap<>();
        entities.forEach((item) -> {
            String day = item.getDay();
            String mealType = item.getMealType().getMealType();
            String foodItems = item.getFoodItems();

            menuMap.putIfAbsent(day,new HashMap<>());

            menuMap.get(day).put(mealType, foodItems);
        });
        log.info("Exiting from food menu function ");
        return menuMap;
    }
}
