package com.vit.hostel.management.controllers;

import com.vit.hostel.management.dtos.RoomTypeDTO;
import com.vit.hostel.management.service.CreateRoomTypeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room-types")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
@Tag(name="Room Types", description = "This API returns room type information by id")
public class CreateRoomTypesController {
    private final CreateRoomTypeService createRoomTypesService;

    public CreateRoomTypesController(CreateRoomTypeService createRoomTypeService){
        this.createRoomTypesService = createRoomTypeService;
    }

    @GetMapping("/get-all-room-types")
    public ResponseEntity<List<RoomTypeDTO>> getRoomTypes() {
        return ResponseEntity.ok(createRoomTypesService.getAllRoomTypes());
    }

    @GetMapping("/get-roomType-by-id/{roomTypeId}")
    public ResponseEntity<RoomTypeDTO> getRoomTypeById(@PathVariable(name = "roomTypeId") Integer roomTypeId){
        return ResponseEntity.ok(createRoomTypesService.getRoomTypeById(roomTypeId));
    }


    @PostMapping("/add-room-type")
    public ResponseEntity<String> addRoomType(@RequestBody RoomTypeDTO roomTypeDTO) {
        return ResponseEntity.ok(createRoomTypesService.addRoomType(roomTypeDTO));
    }
}
