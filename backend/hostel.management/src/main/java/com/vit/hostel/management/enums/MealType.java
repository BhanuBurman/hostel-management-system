package com.vit.hostel.management.enums;

import lombok.Getter;

@Getter
public enum MealType implements PersistableEnum {
    BREAKFAST("Breakfast"),
    LUNCH("Lunch"),
    SNACKS("Snacks"),
    DINNER("Dinner");

    private final String mealType;

    MealType(String mealType) {
        this.mealType = mealType;
    }

    @Override
    public String getValue() {
        return mealType;
    }
}

