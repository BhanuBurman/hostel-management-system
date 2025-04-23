package com.vit.hostel.management.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

@Getter
public enum MealType implements PersistableEnum {
    @JsonProperty("Breakfast")
    Breakfast("Breakfast"),

    @JsonProperty("Lunch")
    Lunch("Lunch"),

    @JsonProperty("Snacks")
    Snacks("Snacks"),

    @JsonProperty("Dinner")
    Dinner("Dinner");

    private final String mealType;

    MealType(String mealType) {
        this.mealType = mealType;
    }

    @JsonValue
    public String getMealType() {
        return mealType;
    }

    @JsonCreator
    public static MealType fromValue(String value) {
        System.out.println("Received value for MealType: " + value);  // Add more detailed logging
        for (MealType meal : values()) {
            System.out.println("Checking enum: " + meal.getMealType() + " against value: " + value);  // Debug comparison
            if (meal.getMealType().equalsIgnoreCase(value)) {
                return meal;
            }
        }
        throw new IllegalArgumentException("Invalid value for MealType Enum: " + value);  // Error message
    }

    @Override
    public String getValue() {
        return this.mealType;
    }
}
