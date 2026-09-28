package com.vit.hostel.management.dtos.complainDtos;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComplaintResponseDTO {
    private int complaintId;
    private String studentRegNumber;
    private String studentName;
//    private int categoryId;
    private String categoryName;
//    private int subcategoryId;
    private String subcategoryName;
    private String description;
    private String status;
    private String submittedAt;
    private String updatedAt;
//    private int adminId;
}
