package com.vit.hostel.management.controllers;

import com.vit.hostel.management.dtos.RoomInfoDTO;
import com.vit.hostel.management.service.RoomInfoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import jakarta.websocket.server.PathParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class RoomController {
    private final RoomInfoService roomInfoService;
    public RoomController(RoomInfoService roomInfoService){
        this.roomInfoService = roomInfoService;
    }
    @GetMapping("/get-all-room-info")
    public ResponseEntity<List<RoomInfoDTO>> getAllRoomInfo(){
        return ResponseEntity.ok(roomInfoService.getAllRoomInfo());
    }

    @GetMapping("/get-rooms-by-floor-number/{floorNumber}")
    public ResponseEntity<List<RoomInfoDTO>> getRoomsByFloorNumber(@PathVariable("floorNumber") Integer floorNumber){
        return ResponseEntity.ok(roomInfoService.getAllRoomsInfoByFloorNumber(floorNumber));
    }

    @GetMapping("/get-total-floors")
    public ResponseEntity<Integer> getTotalFloors(){
        return ResponseEntity.ok(roomInfoService.getTotalFloors());
    }


    @PostMapping("/add-room-info")
    public ResponseEntity<String> addRoomInfo(@RequestBody RoomInfoDTO roomInfoDTO){
        return ResponseEntity.ok(roomInfoService.addRoomInfo(roomInfoDTO));
    }

    @PostMapping("/add-multiple-rooms-info")
    public ResponseEntity<String> addMultiRoomInfo(@RequestBody List<RoomInfoDTO> roomInfoDTOList){
        return ResponseEntity.ok(roomInfoService.addMultiRoomInfo(roomInfoDTOList));
    }
}
