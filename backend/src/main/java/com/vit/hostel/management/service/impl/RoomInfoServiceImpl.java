package com.vit.hostel.management.service.impl;

import com.vit.hostel.management.dtos.RoomBookingRequestDTO;
import com.vit.hostel.management.dtos.RoomInfoDTO;
import com.vit.hostel.management.entities.RoomEntity;
import com.vit.hostel.management.entities.StudentInfoEntity;
import com.vit.hostel.management.repository.RoomInfoRepository;
import com.vit.hostel.management.repository.StudentRepository;
import com.vit.hostel.management.service.RoomInfoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class RoomInfoServiceImpl implements RoomInfoService {
    private final StudentRepository studentRepository;
    private final RoomInfoRepository roomInfoRepository;
    public RoomInfoServiceImpl(StudentRepository studentRepository, RoomInfoRepository roomInfoRepository){
        this.studentRepository = studentRepository;
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

    @Override
    public Integer getTotalFloors() {
        return roomInfoRepository.findDistinctFloorNumbers();
    }

    @Override
    public String addMultiRoomInfo(List<RoomInfoDTO> roomInfoDTOList) {
        roomInfoDTOList.forEach(this::addRoomInfo);
        return "Successfully stored room information";
    }

    @Override
    public String bookRoom(RoomBookingRequestDTO roomBookingRequestDTO) {
        StudentInfoEntity student = studentRepository.findByRegNumber(roomBookingRequestDTO.getRegNumber());
        if(student == null){
            return "User not found with the reg number "+ roomBookingRequestDTO.getRegNumber();
        }
        if(student.getRoomNumber() != null){
            RoomEntity currRoom = roomInfoRepository.findByRoomNumber(student.getRoomNumber());
            currRoom.setAvailableBeds(currRoom.getAvailableBeds()+1);
            currRoom.setOccupiedBeds(currRoom.getOccupiedBeds()-1);
            roomInfoRepository.save(currRoom);
        }
        RoomEntity room = roomInfoRepository.findByRoomNumber(roomBookingRequestDTO.getRoomNumber());
        if(room == null){
            return roomBookingRequestDTO.getRoomNumber()+" room is not present!";
        }
        if(room.getAvailableBeds() == 0) {
            return roomBookingRequestDTO.getRoomNumber()+" room is not available";
        }

        room.setAvailableBeds(room.getAvailableBeds()-1);
        room.setOccupiedBeds(room.getOccupiedBeds()+1);
        roomInfoRepository.save(room);

        student.setRoomNumber(roomBookingRequestDTO.getRoomNumber());
        studentRepository.save(student);
        return "Room No. "+roomBookingRequestDTO.getRoomNumber()+" Booked Successfully by Student "+roomBookingRequestDTO.getRegNumber();
    }


}
