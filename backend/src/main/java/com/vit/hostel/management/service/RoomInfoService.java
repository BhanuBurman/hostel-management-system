package com.vit.hostel.management.service;

import com.vit.hostel.management.dtos.RoomAvailabilityDTO;
import com.vit.hostel.management.dtos.RoomBookingRequestDTO;
import com.vit.hostel.management.dtos.RoomInfoDTO;
import com.vit.hostel.management.dtos.RoomVacateRequestDTO;

import java.util.List;

public interface RoomInfoService {

    List<RoomInfoDTO> getAllRoomInfo();

    String addRoomInfo(RoomInfoDTO roomInfoDTO);

    List<RoomInfoDTO> getAllRoomsInfoByFloorNumber(Integer floorNumber);

    Integer getTotalFloors();

    String addMultiRoomInfo(List<RoomInfoDTO> roomInfoDTOList);

    /**
     * Books a room for a student. Handles both new bookings and room changes.
     * Transactional + Pessimistic Locking prevents double-booking.
     */
    String bookRoom(RoomBookingRequestDTO roomBookingRequestDTO);

    /**
     * Vacates the current room for a student, freeing up a bed.
     */
    String vacateRoom(RoomVacateRequestDTO roomVacateRequestDTO);

    /**
     * Returns live availability info for a specific room.
     */
    RoomAvailabilityDTO getRoomAvailability(String roomNumber);

    /**
     * Returns the room currently booked by a student (or null if none).
     */
    RoomInfoDTO getMyBooking(String regNumber);
}
