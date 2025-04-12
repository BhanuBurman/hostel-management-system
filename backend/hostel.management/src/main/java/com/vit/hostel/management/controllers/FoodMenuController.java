package com.vit.hostel.management.controllers;

import com.vit.hostel.management.dtos.FoodMenuDTO;
import com.vit.hostel.management.service.FoodMenuService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/food")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
@Tag(name="Food menu", description = "This API returns food menu information")
public class FoodMenuController {
    private final FoodMenuService foodMenuService;
    FoodMenuController(FoodMenuService foodMenuService){
        this.foodMenuService = foodMenuService;
    }
    @GetMapping("/get-food-menu")
    public ResponseEntity<Map<String, Map<String, String>>> getFoodMenuDetails(){
        return ResponseEntity.ok(foodMenuService.getFoodMenuDetails());
    }
}
