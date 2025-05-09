package com.vit.hostel.management.dtos.complainDtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ComplaintRequestDTO {
    private String studentRegNumber;
    private int categoryId;
    private int subcategoryId;
    private String description;
}
