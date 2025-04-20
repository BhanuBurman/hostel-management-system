package com.vit.hostel.management.dtos.authentication;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDetailsDTO {
    private Integer roleTypeId;
    private String regNumber;
    private String password;
}
