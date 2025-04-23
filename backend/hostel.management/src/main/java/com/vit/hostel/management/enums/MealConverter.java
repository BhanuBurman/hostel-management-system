package com.vit.hostel.management.enums;

import org.springframework.stereotype.Component;

@Component  // Marked as a Spring component, to allow for easier injection if needed
public class MealConverter extends EnumConverter<MealType> {

    // Pass the enum class to the parent class constructor
    public MealConverter() {
        super(MealType.class);
    }
}
