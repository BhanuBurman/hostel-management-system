package com.vit.hostel.management.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoomAvailabilityDTO {
    private String roomNumber;
    private Integer totalBeds;
    private Integer availableBeds;
    private Integer occupiedBeds;
    private boolean isAvailable;
}
