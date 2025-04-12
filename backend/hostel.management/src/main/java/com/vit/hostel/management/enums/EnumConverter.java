package com.vit.hostel.management.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.lang.reflect.Method;

@Converter(autoApply = true) // This makes it automatic for all Types
public abstract class EnumConverter<E extends Enum<E> & PersistableEnum> implements AttributeConverter<E, String> {

    private final Class<E> enumClass;

    protected EnumConverter(Class<E> enumClass) {
        this.enumClass = enumClass;
    }


    @Override
    public String convertToDatabaseColumn(E attribute) {
        return attribute == null ? null : attribute.getValue();
    }

    @Override
    public E convertToEntityAttribute(String dbData) {
        if(dbData == null ) return  null ;
        try {
            Method fromValue = enumClass.getMethod("fromValue", String.class);
            return enumClass.cast(fromValue.invoke(null, dbData));
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to convert DB value to enum", e);
        }
    }
}

