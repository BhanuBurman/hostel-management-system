package com.vit.hostel.management.controllers;

import com.vit.hostel.management.dtos.FoodMenuDTO;
import com.vit.hostel.management.service.FoodMenuService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/food")
@CrossOrigin
@Tag(name="Food menu", description = "This API returns food menu information")
@Slf4j
public class FoodMenuController {
    private final FoodMenuService foodMenuService;
    FoodMenuController(FoodMenuService foodMenuService){
        this.foodMenuService = foodMenuService;
    }
    @GetMapping("/get-food-menu")
    public ResponseEntity<Map<String, Map<String, String>>> getFoodMenuDetails(){
        log.info("I am inside food menu controller");
        return ResponseEntity.ok(foodMenuService.getFoodMenuDetails());
    }
}
