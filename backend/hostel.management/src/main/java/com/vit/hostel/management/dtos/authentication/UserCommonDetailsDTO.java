package com.vit.hostel.management.dtos.authentication;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserCommonDetailsDTO {
    private String roleType;
    private String name;
    private String regNumber;
    private String email;
    private String phone;
    private String roomNumber;
}
