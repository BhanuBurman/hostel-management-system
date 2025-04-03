package com.vit.hostel.management.dtos.complainDtos;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComplaintDTO {
    private int complaintId;
    private int studentId;
    private int categoryId;
    private int subcategoryId;
    private String description;
    private String status;
    private String submittedAt;
    private String updatedAt;
    private int adminId;
}
