package com.vit.hostel.management.dtos.authentication;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthRequestDTO {
    private String roleType;
    private String regNumber;
    private String password;
}
