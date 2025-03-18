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
public class CreateRoomTypesController {
    private final CreateRoomTypeService createRoomTypesService;

    public CreateRoomTypesController(CreateRoomTypeService createRoomTypeService){
        this.createRoomTypesService = createRoomTypeService;
    }
    @Tag(name="Get All Room Types", description = "This API returns all the available room types")
    @GetMapping("/get-all-room-types")
    public ResponseEntity<List<RoomTypeDTO>> getRoomTypes() {
        return ResponseEntity.ok(createRoomTypesService.getAllRoomTypes());
    }

    @Tag(name="Add a new room types", description = "This API adds the new room type data")
    @PostMapping("/add-room-type")
    public ResponseEntity<String> addRoomType(@RequestBody RoomTypeDTO roomTypeDTO) {
        return ResponseEntity.ok(createRoomTypesService.addRoomType(roomTypeDTO));
    }
}
