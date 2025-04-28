package com.vit.hostel.management.dtos.complainDtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ComplaintUpdateRequestDTO {
    private Integer complaintId;
    private String adminRegNumber;
    private String comment;
    private String status;
}
