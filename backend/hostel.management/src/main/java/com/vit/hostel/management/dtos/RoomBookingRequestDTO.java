package com.vit.hostel.management.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoomBookingRequestDTO {
    private String roomNumber;
    private String regNumber;
}
