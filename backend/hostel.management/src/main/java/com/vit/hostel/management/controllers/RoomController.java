package com.vit.hostel.management.controllers;

import com.vit.hostel.management.dtos.RoomInfoDTO;
import com.vit.hostel.management.service.RoomInfoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room")
public class RoomController {
    private final RoomInfoService roomInfoService;
    public RoomController(RoomInfoService roomInfoService){
        this.roomInfoService = roomInfoService;
    }
    @GetMapping("/get-all-room-info")
    public ResponseEntity<List<RoomInfoDTO>> getAllRoomInfo(){
        return ResponseEntity.ok(roomInfoService.getAllRoomInfo());
    }

    @PostMapping("/add-room-info")
    public ResponseEntity<String> addRoomInfo(@RequestBody RoomInfoDTO roomInfoDTO){
        return ResponseEntity.ok(roomInfoService.addRoomInfo(roomInfoDTO));
    }
}
