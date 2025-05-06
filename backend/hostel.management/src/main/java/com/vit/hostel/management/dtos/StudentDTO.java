package com.vit.hostel.management.dtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentDTO {
    private String studentName;
    private String password;

    private String regNumber;
    private String studentEmail;
    private String studentPhone;
    private String studentAddress;
    private String studentGender;
    private String studentDOB;
    private String studentBranch;
    private String admissionYear;
}
