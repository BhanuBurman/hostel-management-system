package com.vit.hostel.management.service;

import com.vit.hostel.management.dtos.RoomInfoDTO;

import java.util.List;

public interface RoomInfoService {
    List<RoomInfoDTO> getAllRoomInfo();

    String addRoomInfo(RoomInfoDTO roomInfoDTO);
}
