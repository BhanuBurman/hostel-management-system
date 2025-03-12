package com.vit.hostel.management.service.impl;

import com.vit.hostel.management.dtos.RoomInfoDTO;
import com.vit.hostel.management.entities.RoomEntity;
import com.vit.hostel.management.repository.RoomInfoRepository;
import com.vit.hostel.management.service.RoomInfoService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomInfoServiceImpl implements RoomInfoService {
    private final RoomInfoRepository roomInfoRepository;
    public RoomInfoServiceImpl(RoomInfoRepository roomInfoRepository){
        this.roomInfoRepository = roomInfoRepository;
    }
    @Override
    public List<RoomInfoDTO> getAllRoomInfo(){
        List<RoomEntity> roomEntities = roomInfoRepository.findAll();
        return roomEntities.stream().map(roomEntity -> new RoomInfoDTO(roomEntity.getRoomNumber(), roomEntity.getRoomTypeId(), roomEntity.getTotalBeds(), roomEntity.getAvailableBeds(), roomEntity.getOccupied_beds())).toList();
    }

    @Override
    public String addRoomInfo(RoomInfoDTO roomInfoDTO) {
        RoomEntity roomEntity = new RoomEntity();
        roomEntity.setRoomNumber(roomInfoDTO.getRoomNumber());
        roomEntity.setRoomTypeId(roomInfoDTO.getRoomTypeId());
        roomEntity.setAvailableBeds(roomInfoDTO.getAvailableBeds());
        roomEntity.setOccupied_beds(roomInfoDTO.getOccupiedBeds());
        roomEntity.setTotalBeds(roomInfoDTO.getTotalBeds());
        roomInfoRepository.save(roomEntity);
        return "Successfully stored room information";
    }
}
