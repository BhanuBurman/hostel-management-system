package com.vit.hostel.management.service.impl;

import com.vit.hostel.management.dtos.RoomAvailabilityDTO;
import com.vit.hostel.management.dtos.RoomBookingRequestDTO;
import com.vit.hostel.management.dtos.RoomInfoDTO;
import com.vit.hostel.management.dtos.RoomVacateRequestDTO;
import com.vit.hostel.management.entities.RoomEntity;
import com.vit.hostel.management.entities.StudentInfoEntity;
import com.vit.hostel.management.repository.RoomInfoRepository;
import com.vit.hostel.management.repository.StudentRepository;
import com.vit.hostel.management.service.RoomInfoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
public class RoomInfoServiceImpl implements RoomInfoService {

    private final StudentRepository studentRepository;
    private final RoomInfoRepository roomInfoRepository;

    public RoomInfoServiceImpl(StudentRepository studentRepository, RoomInfoRepository roomInfoRepository) {
        this.studentRepository = studentRepository;
        this.roomInfoRepository = roomInfoRepository;
    }

    // ──────────────────────────────────────────────────
    // READ OPERATIONS (No locking needed)
    // ──────────────────────────────────────────────────

    @Override
    public List<RoomInfoDTO> getAllRoomInfo() {
        return roomInfoRepository.findAll().stream()
                .map(this::toRoomInfoDTO)
                .toList();
    }

    @Override
    public List<RoomInfoDTO> getAllRoomsInfoByFloorNumber(Integer floorNumber) {
        return roomInfoRepository.findByFloorNumber(floorNumber).stream()
                .map(this::toRoomInfoDTO)
                .toList();
    }

    @Override
    public Integer getTotalFloors() {
        return roomInfoRepository.findDistinctFloorNumbers();
    }

    /**
     * Returns availability info for a given room without locking.
     * This is a read-only check — actual booking still goes through bookRoom().
     */
    @Override
    @Transactional(readOnly = true)
    public RoomAvailabilityDTO getRoomAvailability(String roomNumber) {
        RoomEntity room = roomInfoRepository.findByRoomNumber(roomNumber);
        if (room == null) {
            return null;
        }
        return new RoomAvailabilityDTO(
                room.getRoomNumber(),
                room.getTotalBeds(),
                room.getAvailableBeds(),
                room.getOccupiedBeds(),
                room.getAvailableBeds() > 0);
    }

    /**
     * Returns the RoomInfoDTO for the room currently assigned to a student.
     * Returns null if the student has no room or is not found.
     */
    @Override
    @Transactional(readOnly = true)
    public RoomInfoDTO getMyBooking(String regNumber) {
        StudentInfoEntity student = studentRepository.findByRegNumber(regNumber);
        if (student == null || student.getRoomNumber() == null) {
            return null;
        }
        RoomEntity room = roomInfoRepository.findByRoomNumber(student.getRoomNumber());
        if (room == null) {
            return null;
        }
        return toRoomInfoDTO(room);
    }

    // ──────────────────────────────────────────────────
    // WRITE OPERATIONS (Admin)
    // ──────────────────────────────────────────────────

    @Override
    public String addRoomInfo(RoomInfoDTO roomInfoDTO) {
        RoomEntity roomEntity = new RoomEntity();
        roomEntity.setRoomNumber(roomInfoDTO.getRoomNumber());
        roomEntity.setRoomTypeId(roomInfoDTO.getRoomTypeId());
        roomEntity.setAvailableBeds(roomInfoDTO.getAvailableBeds());
        roomEntity.setOccupiedBeds(roomInfoDTO.getOccupiedBeds());
        roomEntity.setTotalBeds(roomInfoDTO.getTotalBeds());
        roomEntity.setFloorNumber(roomInfoDTO.getFloorNumber());
        roomInfoRepository.save(roomEntity);
        return "Successfully stored room information";
    }

    @Override
    public String addMultiRoomInfo(List<RoomInfoDTO> roomInfoDTOList) {
        roomInfoDTOList.forEach(this::addRoomInfo);
        return "Successfully stored " + roomInfoDTOList.size() + " rooms";
    }

    // ──────────────────────────────────────────────────
    // BOOKING OPERATIONS (Transactional + Locked)
    // ──────────────────────────────────────────────────

    /**
     * Books a room for a student. This method is the core of the concurrency fix.
     *
     * HOW IT WORKS:
     * 1. @Transactional wraps the entire method in a single DB transaction.
     * 2. findByRoomNumberWithLock() issues "SELECT ... FOR UPDATE" at the DB level.
     * → If two threads try to book the SAME room simultaneously, one will wait
     * at this line until the other's transaction commits. No more race condition.
     * 3. We re-check availability AFTER acquiring the lock (the count may have
     * changed
     * while we were waiting for the lock).
     * 4. If the student already has a room, we release it first (inside the same
     * transaction).
     * 5. On any failure, the entire transaction rolls back — no partial updates.
     */
    @Override
    @Transactional
    public String bookRoom(RoomBookingRequestDTO req) {
        // 1. Validate student
        StudentInfoEntity student = studentRepository.findByRegNumber(req.getRegNumber());
        if (student == null) {
            return "Student not found with reg number: " + req.getRegNumber();
        }

        // 2. Acquire Pessimistic Lock on the TARGET room
        RoomEntity targetRoom = roomInfoRepository
                .findByRoomNumberWithLock(req.getRoomNumber())
                .orElse(null);
        if (targetRoom == null) {
            return "Room " + req.getRoomNumber() + " does not exist.";
        }

        // 3. Re-check availability AFTER acquiring the lock (atomic check)
        if (targetRoom.getAvailableBeds() <= 0) {
            return "Room " + req.getRoomNumber() + " is fully occupied. No beds available.";
        }

        // 4. If student already has a room, release it first
        String currentRoomNumber = student.getRoomNumber();
        if (currentRoomNumber != null && !currentRoomNumber.equals(req.getRoomNumber())) {
            // Lock the old room too before modifying it
            RoomEntity oldRoom = roomInfoRepository
                    .findByRoomNumberWithLock(currentRoomNumber)
                    .orElse(null);
            if (oldRoom != null) {
                oldRoom.setAvailableBeds(oldRoom.getAvailableBeds() + 1);
                oldRoom.setOccupiedBeds(oldRoom.getOccupiedBeds() - 1);
                roomInfoRepository.save(oldRoom);
                log.info("Released bed in old room {} for student {}", currentRoomNumber, req.getRegNumber());
            }
        } else if (currentRoomNumber != null && currentRoomNumber.equals(req.getRoomNumber())) {
            // Student is already in this exact room — nothing to do
            return "Student " + req.getRegNumber() + " is already booked in room " + req.getRoomNumber() + ".";
        }

        // 5. Assign the new room
        targetRoom.setAvailableBeds(targetRoom.getAvailableBeds() - 1);
        targetRoom.setOccupiedBeds(targetRoom.getOccupiedBeds() + 1);
        roomInfoRepository.save(targetRoom);

        student.setRoomNumber(req.getRoomNumber());
        studentRepository.save(student);

        log.info("Room {} booked successfully for student {}", req.getRoomNumber(), req.getRegNumber());
        return "Room " + req.getRoomNumber() + " booked successfully for student " + req.getRegNumber() + ".";
    }

    /**
     * Vacates the current room assigned to a student.
     * Also @Transactional + Locked to prevent a student from being vacated
     * and booked at the same time in conflicting threads.
     */
    @Override
    @Transactional
    public String vacateRoom(RoomVacateRequestDTO req) {
        // 1. Validate student
        StudentInfoEntity student = studentRepository.findByRegNumber(req.getRegNumber());
        if (student == null) {
            return "Student not found with reg number: " + req.getRegNumber();
        }

        // 2. Ensure student has a room to vacate
        if (student.getRoomNumber() == null) {
            return "Student " + req.getRegNumber() + " does not have any room assigned.";
        }

        // 3. Lock and update the room
        RoomEntity room = roomInfoRepository
                .findByRoomNumberWithLock(student.getRoomNumber())
                .orElse(null);
        if (room != null) {
            room.setAvailableBeds(room.getAvailableBeds() + 1);
            room.setOccupiedBeds(room.getOccupiedBeds() - 1);
            roomInfoRepository.save(room);
        }

        // 4. Clear the student's assignment
        String vacatedRoom = student.getRoomNumber();
        student.setRoomNumber(null);
        studentRepository.save(student);

        log.info("Student {} vacated room {}", req.getRegNumber(), vacatedRoom);
        return "Student " + req.getRegNumber() + " has successfully vacated room " + vacatedRoom + ".";
    }

    // ──────────────────────────────────────────────────
    // Private Helper
    // ──────────────────────────────────────────────────

    private RoomInfoDTO toRoomInfoDTO(RoomEntity r) {
        return new RoomInfoDTO(
                r.getRoomId(),
                r.getRoomNumber(),
                r.getRoomTypeId(),
                r.getTotalBeds(),
                r.getAvailableBeds(),
                r.getOccupiedBeds(),
                r.getFloorNumber());
    }
}
