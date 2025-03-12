package com.vit.hostel.management.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "rooms")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Integer roomId;

    @Column(name = "room_number")
    private String roomNumber;

    @Column(name = "room_type_id")
    private Integer roomTypeId;
    @Column(name = "total_beds")
    private Integer totalBeds;
    @Column(name = "available_beds")
    private Integer availableBeds;
    @Column(name = "occupied_beds")
    private Integer occupied_beds;
}
