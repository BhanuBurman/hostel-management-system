package com.vit.hostel.management.enums;

import lombok.Getter;

@Getter
public enum RoleType implements PersistableEnum {
    STUDENT("Student"),
    ADMIN("Admin"),
    WARDEN("Warden");

    private final String roleName;

    RoleType(String roleName) {
        this.roleName = roleName;
    }

    @Override
    public String getValue() {
        return roleName;
    }
}
