package com.vit.hostel.management.enums;

import lombok.Getter;

@Getter
public enum RoleTypeName implements PersistableEnum {
    Student("Student"),
    Admin("Admin"),
    Warden("Warden");

    private final String roleName;

    RoleTypeName(String roleName) {
        this.roleName = roleName;
    }

    @Override
    public String getValue() {
        return roleName;
    }
}
