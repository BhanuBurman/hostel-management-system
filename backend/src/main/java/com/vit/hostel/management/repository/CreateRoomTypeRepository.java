package com.vit.hostel.management.repository;

import com.vit.hostel.management.entities.RoomTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CreateRoomTypeRepository extends JpaRepository<RoomTypeEntity,Integer> {
    List<RoomTypeEntity> findAll();
//    Optional<RoomTypeEntity> findById(Integer roomTypeId);
}
