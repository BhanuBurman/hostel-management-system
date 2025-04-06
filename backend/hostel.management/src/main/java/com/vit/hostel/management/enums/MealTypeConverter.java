package com.vit.hostel.management.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true) // This makes it automatic for all MealType fields
public class MealTypeConverter implements AttributeConverter<MealType, String> {

    @Override
    public String convertToDatabaseColumn(MealType attribute) {
        return attribute == null ? null : attribute.getMealType();
    }

    @Override
    public MealType convertToEntityAttribute(String dbData) {
        return dbData == null ? null : MealType.fromString(dbData);
    }
}

