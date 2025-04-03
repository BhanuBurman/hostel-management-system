package com.vit.hostel.management.dtos.complainDtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ComplaintSubCategoryDTO {
    private int subCategoryId;
    private int categoryId;
    private String subCategoryName;
}
