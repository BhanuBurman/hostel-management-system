package com.vit.hostel.management.dtos.complainDtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ComplainDetailDTO {
    // complain information
    private int complainId;
    private String categoryName;
    private String subcategoryName;
    private String status;
    private String description;
    private String submittedAt;
    private String updatedAt;
    private String comment;

    // student information
    private int studentId;
    private String studentName;
    private String studentEmail;
    private String regNumber;
    private String studentPhone;
    private String studentAddress;
    private String roomNumber;
    private String studentGender;
    private String studentDOB;
    private String studentBranch;
    private String admissionYear;
}
