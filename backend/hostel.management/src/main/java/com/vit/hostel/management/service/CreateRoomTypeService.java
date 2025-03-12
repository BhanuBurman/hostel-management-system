package com.vit.hostel.management.service;

import com.vit.hostel.management.dtos.RoomTypeDTO;
import org.springframework.stereotype.Service;

import java.util.List;

public interface CreateRoomTypeService {
    List<RoomTypeDTO> getAllRoomTypes();

    String addRoomType(RoomTypeDTO roomTypeDTO);
}
