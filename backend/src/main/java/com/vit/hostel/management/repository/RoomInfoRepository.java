package com.vit.hostel.management.repository;

import com.vit.hostel.management.entities.RoomEntity;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RoomInfoRepository extends JpaRepository<RoomEntity, String> {

    List<RoomEntity> findAll();

    List<RoomEntity> findByFloorNumber(Integer floorNumber);

    // Standard read - for non-critical lookups (e.g., availability checks)
    RoomEntity findByRoomNumber(String roomNumber);

    /**
     * Pessimistic Write Lock: When this method is called inside a @Transactional
     * block,
     * it issues a "SELECT ... FOR UPDATE" SQL statement. This locks the database
     * row,
     * preventing any other transaction from reading or writing to it until this
     * transaction
     * commits or rolls back. This is the KEY fix for the parallel booking race
     * condition.
     */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT r FROM RoomEntity r WHERE r.roomNumber = :roomNumber")
    Optional<RoomEntity> findByRoomNumberWithLock(@Param("roomNumber") String roomNumber);

    @Query(value = "SELECT COUNT(DISTINCT floor_number) FROM rooms", nativeQuery = true)
    Integer findDistinctFloorNumbers();
}
