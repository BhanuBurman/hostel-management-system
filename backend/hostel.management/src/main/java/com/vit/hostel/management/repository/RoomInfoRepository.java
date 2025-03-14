package com.vit.hostel.management.repository;

import com.vit.hostel.management.entities.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomInfoRepository extends JpaRepository<RoomEntity, String> {
    public List<RoomEntity> findAll();
}
