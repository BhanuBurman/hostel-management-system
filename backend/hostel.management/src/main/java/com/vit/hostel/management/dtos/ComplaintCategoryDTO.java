package com.vit.hostel.management.dtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ComplaintCategoryDTO {
    private int id;
    private String categoryName;
}
