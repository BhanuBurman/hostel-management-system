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
        return roomEntities.stream().map(roomEntity -> new RoomInfoDTO(roomEntity.getRoomId(),roomEntity.getRoomNumber(), roomEntity.getRoomTypeId(), roomEntity.getTotalBeds(), roomEntity.getAvailableBeds(), roomEntity.getFloorNumber(), roomEntity.getOccupiedBeds())).toList();
    }

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
    public List<RoomInfoDTO> getAllRoomsInfoByFloorNumber(Integer floorNumber) {
        List<RoomEntity> roomEntities = roomInfoRepository.findByFloorNumber(floorNumber);
        return roomEntities.stream().map(roomEntity -> new RoomInfoDTO(roomEntity.getRoomId(),roomEntity.getRoomNumber(), roomEntity.getRoomTypeId(), roomEntity.getTotalBeds(), roomEntity.getAvailableBeds(), roomEntity.getFloorNumber(), roomEntity.getOccupiedBeds())).toList();
    }




}
