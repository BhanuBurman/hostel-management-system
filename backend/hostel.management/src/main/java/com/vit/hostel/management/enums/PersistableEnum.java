package com.vit.hostel.management.enums;

public interface PersistableEnum {
    String getValue(); // This method ensures that the enum can be serialized to a database-friendly format
}
