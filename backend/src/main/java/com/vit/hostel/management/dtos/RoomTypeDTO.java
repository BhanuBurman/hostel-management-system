package com.vit.hostel.management.dtos;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomTypeDTO {
    private Integer id;
    private Boolean isAC;
    private Integer noOfBeds;
    private Integer noOfFans;
    private Integer noOfLights;
    private Integer noOfTables;
    private Integer noOfAlmira;
    private Integer noOfChairs;
    private Double price;
    private String image;
}
