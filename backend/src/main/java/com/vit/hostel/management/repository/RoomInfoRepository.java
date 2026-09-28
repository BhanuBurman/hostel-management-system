package com.vit.hostel.management.repository;

import com.vit.hostel.management.entities.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomInfoRepository extends JpaRepository<RoomEntity, String> {
    List<RoomEntity> findAll();
    List<RoomEntity> findByFloorNumber(Integer floorNumber);
    RoomEntity findByRoomNumber(String roomNumber);
    @Query(value = "SELECT COUNT(DISTINCT floor_number) FROM rooms", nativeQuery = true)
    Integer findDistinctFloorNumbers();
}
