package com.vit.hostel.management.dtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoomInfoDTO {
    private Integer roomId;
    private String roomNumber;
    private Integer roomTypeId;
    private Integer totalBeds;
    private Integer availableBeds;
    private Integer occupiedBeds;
    private Integer floorNumber;
}
