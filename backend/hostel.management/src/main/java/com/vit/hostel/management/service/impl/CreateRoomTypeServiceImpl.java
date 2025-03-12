package com.vit.hostel.management.service.impl;

import com.vit.hostel.management.dtos.RoomTypeDTO;
import com.vit.hostel.management.entities.RoomTypeEntity;
import com.vit.hostel.management.repository.CreateRoomTypeRepository;
import com.vit.hostel.management.service.CreateRoomTypeService;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class CreateRoomTypeServiceImpl implements CreateRoomTypeService {
    private final CreateRoomTypeRepository createRoomTypeRepository;
    public CreateRoomTypeServiceImpl(CreateRoomTypeRepository createRoomTypeRepository){
        this.createRoomTypeRepository = createRoomTypeRepository;
    }
    @Override
    public List<RoomTypeDTO> getAllRoomTypes(){
        List<RoomTypeEntity> roomTypeEntities = createRoomTypeRepository.findAll();
        log.info("Got list from room type entity: {}", roomTypeEntities.size());
        List<RoomTypeDTO> roomTypeDTOList = new ArrayList<>();
        roomTypeEntities.forEach(item ->{
            RoomTypeDTO roomTypeDTO = new RoomTypeDTO();
            roomTypeDTO.setId(item.getRoomTypeId());
            roomTypeDTO.setNoOfFans(item.getNoOfFans());
            roomTypeDTO.setImage(item.getImage());
            roomTypeDTO.setPrice(item.getPrice());
            roomTypeDTO.setNoOfBeds(item.getNoOfBeds());
            roomTypeDTO.setNoOfChairs(item.getNoOfChairs());
            roomTypeDTO.setNoOfLights(item.getNoOfLights());
            roomTypeDTO.setNoOfAlmira(item.getNoOfAlmira());
            roomTypeDTO.setNoOfTables(item.getNoOfTables());
            roomTypeDTO.setIsAC(item.getIsAC());
            roomTypeDTOList.add(roomTypeDTO);
        });
        return roomTypeDTOList;
    }

    @Override
    public String addRoomType(RoomTypeDTO roomTypeDTO) {
        RoomTypeEntity roomTypeEntity = new RoomTypeEntity();
        roomTypeEntity.setNoOfFans(roomTypeDTO.getNoOfFans());
        roomTypeEntity.setImage(roomTypeDTO.getImage());
        roomTypeEntity.setPrice(roomTypeDTO.getPrice());
        roomTypeEntity.setNoOfBeds(roomTypeDTO.getNoOfBeds());
        roomTypeEntity.setNoOfLights((roomTypeDTO.getNoOfLights()));
        roomTypeEntity.setIsAC(roomTypeDTO.getIsAC());
        roomTypeEntity.setNoOfChairs(roomTypeDTO.getNoOfChairs());
        roomTypeEntity.setNoOfAlmira(roomTypeDTO.getNoOfAlmira());
        roomTypeEntity.setNoOfTables(roomTypeDTO.getNoOfTables());
        createRoomTypeRepository.save(roomTypeEntity);
        return "Room Type Added Successfully";
    }
}
