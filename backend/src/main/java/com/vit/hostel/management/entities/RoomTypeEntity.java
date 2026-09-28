package com.vit.hostel.management.entities;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "room_types")
public class RoomTypeEntity {
    @Getter
    @Id
    @Column(name = "room_type_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomTypeId;

    @Column(name = "no_of_beds")
    private Integer noOfBeds;

    @Column(name = "no_of_lights")
    private Integer noOfLights;

    @Column(name = "no_of_fans")
    private Integer noOfFans;

    @Column(name ="no_of_tables")
    private Integer noOfTables;

    @Column(name = "no_of_almira")
    private Integer noOfAlmira;

    @Column(name = "no_of_chairs")
    private Integer noOfChairs;

    @Column(name = "is_ac")
    private Boolean isAC;

    @Column(name = "price")
    private Double price;

    @Column(name = "image")
    private String image;
}
