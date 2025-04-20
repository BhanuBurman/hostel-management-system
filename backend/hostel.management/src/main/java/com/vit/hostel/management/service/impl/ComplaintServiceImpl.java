package com.vit.hostel.management.service.impl;

import com.vit.hostel.management.dtos.complainDtos.*;
import com.vit.hostel.management.entities.StudentInfoEntity;
import com.vit.hostel.management.entities.complain.ComplaintCategoryEntity;
import com.vit.hostel.management.entities.complain.ComplaintEntity;
import com.vit.hostel.management.entities.complain.ComplaintSubCategoryEntity;
import com.vit.hostel.management.repository.StudentRepository;
import com.vit.hostel.management.repository.complain.ComplaintCategoryRepository;
import com.vit.hostel.management.repository.complain.ComplaintRepository;
import com.vit.hostel.management.repository.complain.ComplaintSubCategoryRepository;
import com.vit.hostel.management.service.ComplaintService;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Service
public class ComplaintServiceImpl implements ComplaintService {
    private final ComplaintCategoryRepository complaintCategoryRepository;
    private final ComplaintSubCategoryRepository complaintSubCategoryRepository;
    private final ComplaintRepository complaintRepository;
    private  final StudentRepository studentRepository;

    ComplaintServiceImpl(ComplaintCategoryRepository complaintCategoryRepository
            , ComplaintSubCategoryRepository complaintSubCategoryRepository
            , ComplaintRepository complaintRepository
    , StudentRepository studentRepository) {
        this.complaintCategoryRepository = complaintCategoryRepository;
        this.complaintSubCategoryRepository = complaintSubCategoryRepository;
        this.complaintRepository = complaintRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    public List<ComplaintCategoryDTO> getAllComplaintCategories() {
        List<ComplaintCategoryEntity> complaintCategoryEntities = complaintCategoryRepository.findAllByOrderByCategoryId();
        return complaintCategoryEntities.stream().map((item) -> {
            return ComplaintCategoryDTO.builder().categoryName(item.getCategoryName()).id(item.getCategoryId()).build();
        }).toList();
    }

    @Override
    public List<ComplaintSubCategoryDTO> getAllComplaintSubCategories() {
        List<ComplaintSubCategoryEntity> complaintSubCategoryEntities = complaintSubCategoryRepository.findAllByOrderBySubCategoryId();
        return complaintSubCategoryEntities.stream().map((item) -> {
            return ComplaintSubCategoryDTO.builder().subCategoryId(item.getSubCategoryId()).subCategoryName(item.getSubcategoryName()).categoryId(item.getCategory().getCategoryId()).build();
        }).toList();
    }

    @Override
    public String addComplaint(ComplaintRequestDTO complaintRequestDTO) {
        ComplaintEntity complaintEntity = ComplaintEntity.builder()
                .categoryId(complaintRequestDTO.getCategoryId())
                .status("Pending").description(complaintRequestDTO.getDescription())
                .subCategoryId(complaintRequestDTO.getSubcategoryId())
                .studentId(complaintRequestDTO.getStudentId())
                .submittedAt(Timestamp.from(Instant.now()))
                .updatedAt(Timestamp.from(Instant.now()))
                .build();
        complaintRepository.save(complaintEntity);
        return "Successfully uploaded complaint details...";
    }

    @Override
    public List<ComplaintResponseDTO> getAllComplaints() {
        List<ComplaintEntity> complaintEntities = complaintRepository.findAll();
        return complaintEntities.stream().map((item) ->{
            ComplaintCategoryEntity category = complaintCategoryRepository.findByCategoryId(item.getCategoryId());
            ComplaintSubCategoryEntity subCategory = complaintSubCategoryRepository.findBySubCategoryId(item.getSubCategoryId());
            return ComplaintResponseDTO.builder()
                    .complaintId(item.getComplaintId())
                    .studentId(item.getStudentId())
                    .studentName("Bhanu")
                    .categoryName(category.getCategoryName())
                    .subcategoryName(subCategory.getSubcategoryName())
                    .status(item.getStatus())
                    .description(item.getDescription())
                    .submittedAt(String.valueOf(item.getSubmittedAt().toLocalDateTime().toLocalDate()))
                    .updatedAt(String.valueOf(item.getUpdatedAt().toLocalDateTime().toLocalDate()))
                    .build();

        }).toList();
    }

    @Override
    public ComplainDetailDTO getComplainDetailsByID(Integer complainId) {
        ComplaintEntity complaint = complaintRepository.findById(complainId).orElseThrow();
        StudentInfoEntity student = studentRepository.findById(complaint.getStudentId()).orElseThrow();
        ComplaintCategoryEntity category = complaintCategoryRepository.findByCategoryId(complaint.getCategoryId());
        ComplaintSubCategoryEntity subCategory = complaintSubCategoryRepository.findBySubCategoryId(complaint.getSubCategoryId());
        return ComplainDetailDTO.builder()
                // complain information
                .complainId(complainId)
                .status(complaint.getStatus())
                .description(complaint.getDescription())
                .categoryName(category.getCategoryName())
                .subcategoryName(subCategory.getSubcategoryName())
                .submittedAt(String.valueOf(complaint.getSubmittedAt()))
                .updatedAt(String.valueOf(complaint.getUpdatedAt()))
                // student information
                .studentId(student.getStudentId())
                .studentName(student.getStudentName())
                .regNumber(student.getRegNumber())
                .roomNumber(student.getRoomNumber())
                .studentGender(student.getGender())
                .admissionYear(String.valueOf(student.getAdmissionYear()))
                .studentAddress(student.getAddress())
                .studentBranch(student.getBranch())
                .studentDOB(String.valueOf(student.getDob()))
                .studentEmail(student.getStudentEmail())
                .studentPhone(student.getPhoneNo())
                .build();
    }
}
