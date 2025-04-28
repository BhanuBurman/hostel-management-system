package com.vit.hostel.management.dtos.authentication;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminDTO {
    private String name;
    private String email;
    private String phone;
    private String regNumber;
    private String password;
}
