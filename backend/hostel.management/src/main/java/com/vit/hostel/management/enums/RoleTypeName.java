package com.vit.hostel.management.enums;

import lombok.Getter;

@Getter
public enum RoleTypeName implements PersistableEnum {
    STUDENT("Student"),
    ADMIN("Admin"),
    WARDEN("Warden");

    private final String roleName;

    RoleTypeName(String roleName) {
        this.roleName = roleName;
    }

    @Override
    public String getValue() {
        return roleName;
    }
}
