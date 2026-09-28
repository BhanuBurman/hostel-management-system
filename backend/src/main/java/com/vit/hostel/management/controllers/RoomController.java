package com.vit.hostel.management.controllers;

import com.vit.hostel.management.dtos.RoomAvailabilityDTO;
import com.vit.hostel.management.dtos.RoomBookingRequestDTO;
import com.vit.hostel.management.dtos.RoomInfoDTO;
import com.vit.hostel.management.dtos.RoomVacateRequestDTO;
import com.vit.hostel.management.service.RoomInfoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room")
@CrossOrigin
@Tag(name = "Rooms", description = "Operations related to room management and booking")
public class RoomController {

    private final RoomInfoService roomInfoService;

    public RoomController(RoomInfoService roomInfoService) {
        this.roomInfoService = roomInfoService;
    }

    // ──────────────────────────────────────────────────
    // READ Endpoints
    // ──────────────────────────────────────────────────

    @Operation(summary = "Get all rooms", description = "Returns a list of all rooms with bed counts and floor info.")
    @GetMapping("/get-all-room-info")
    public ResponseEntity<List<RoomInfoDTO>> getAllRoomInfo() {
        return ResponseEntity.ok(roomInfoService.getAllRoomInfo());
    }

    @Operation(summary = "Get rooms by floor", description = "Returns all rooms on a specific floor number.")
    @GetMapping("/get-rooms-by-floor-number/{floorNumber}")
    public ResponseEntity<List<RoomInfoDTO>> getRoomsByFloorNumber(@PathVariable Integer floorNumber) {
        return ResponseEntity.ok(roomInfoService.getAllRoomsInfoByFloorNumber(floorNumber));
    }

    @Operation(summary = "Get total floor count", description = "Returns the number of distinct floors in the hostel.")
    @GetMapping("/get-total-floors")
    public ResponseEntity<Integer> getTotalFloors() {
        return ResponseEntity.ok(roomInfoService.getTotalFloors());
    }

    /**
     * NEW: Real-time availability check for a specific room.
     * Note: This is a snapshot — actual booking still requires calling /book-room.
     */
    @Operation(summary = "Check room availability", description = "Returns live bed availability for a specific room.")
    @GetMapping("/availability/{roomNumber}")
    public ResponseEntity<RoomAvailabilityDTO> getRoomAvailability(@PathVariable String roomNumber) {
        RoomAvailabilityDTO availability = roomInfoService.getRoomAvailability(roomNumber);
        if (availability == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(availability);
    }

    /**
     * NEW: Fetch current room booking for a student by registration number.
     */
    @Operation(summary = "Get student's current booking", description = "Returns the room details currently assigned to the student.")
    @GetMapping("/my-booking/{regNumber}")
    public ResponseEntity<RoomInfoDTO> getMyBooking(@PathVariable String regNumber) {
        RoomInfoDTO booking = roomInfoService.getMyBooking(regNumber);
        if (booking == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(booking);
    }

    // ──────────────────────────────────────────────────
    // ADMIN: Add Room Endpoints
    // ──────────────────────────────────────────────────

    @Operation(summary = "Add a single room", description = "Admin: Adds a new room with bed and floor info.")
    @PostMapping("/add-room-info")
    public ResponseEntity<String> addRoomInfo(@RequestBody RoomInfoDTO roomInfoDTO) {
        return ResponseEntity.ok(roomInfoService.addRoomInfo(roomInfoDTO));
    }

    @Operation(summary = "Bulk add rooms", description = "Admin: Adds multiple rooms in a single request.")
    @PostMapping("/add-multiple-rooms-info")
    public ResponseEntity<String> addMultiRoomInfo(@RequestBody List<RoomInfoDTO> roomInfoDTOList) {
        return ResponseEntity.ok(roomInfoService.addMultiRoomInfo(roomInfoDTOList));
    }

    // ──────────────────────────────────────────────────
    // BOOKING Endpoints (Transactional + Locked)
    // ──────────────────────────────────────────────────

    /**
     * Books a room for a student.
     * If student already has a room, it is released and the new one is assigned.
     * Thread-safe: uses DB-level Pessimistic Locking inside the service layer.
     */
    @Operation(summary = "Book a room", description = "Books the specified room for the student. Handles room change if student already has one. Thread-safe via Pessimistic Locking.")
    @PutMapping("/book-room")
    public ResponseEntity<String> bookRoomByStudent(@RequestBody RoomBookingRequestDTO roomBookingRequestDTO) {
        return ResponseEntity.ok(roomInfoService.bookRoom(roomBookingRequestDTO));
    }

    /**
     * NEW: Vacates the room currently assigned to a student.
     * Increments available beds in the room atomically.
     */
    @Operation(summary = "Vacate a room", description = "Removes the student's room assignment and frees up a bed. Thread-safe via Pessimistic Locking.")
    @PutMapping("/vacate-room")
    public ResponseEntity<String> vacateRoom(@RequestBody RoomVacateRequestDTO roomVacateRequestDTO) {
        return ResponseEntity.ok(roomInfoService.vacateRoom(roomVacateRequestDTO));
    }
}
