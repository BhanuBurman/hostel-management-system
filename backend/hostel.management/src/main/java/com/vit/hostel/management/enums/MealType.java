package com.vit.hostel.management.enums;

import lombok.Getter;

@Getter
public enum MealType {
    BREAKFAST("Breakfast"),
    LUNCH("Lunch"),
    SNACKS("Snacks"),
    DINNER("Dinner");

    private final String mealType;

    MealType(String mealType) {
        this.mealType = mealType;
    }

    public static MealType fromString(String value) {
        for (MealType type : values()) {
            if (type.mealType.equalsIgnoreCase(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Invalid meal type: " + value);
    }
}

