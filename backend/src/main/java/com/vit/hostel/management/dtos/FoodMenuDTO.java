package com.vit.hostel.management.dtos;

import com.vit.hostel.management.enums.MealType;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodMenuDTO {

    private Long id;
    private String day;
    private MealType mealType;
    private String foodItems;
    private Date createdAt;
}
