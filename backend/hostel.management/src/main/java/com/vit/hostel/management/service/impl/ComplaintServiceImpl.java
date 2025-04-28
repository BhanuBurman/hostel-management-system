package com.vit.hostel.management.service.impl;

import com.vit.hostel.management.dtos.complainDtos.*;
import com.vit.hostel.management.entities.StudentInfoEntity;
import com.vit.hostel.management.entities.complain.ComplaintCategoryEntity;
import com.vit.hostel.management.entities.complain.ComplaintCommentEntity;
import com.vit.hostel.management.entities.complain.ComplaintEntity;
import com.vit.hostel.management.entities.complain.ComplaintSubCategoryEntity;
import com.vit.hostel.management.repository.StudentRepository;
import com.vit.hostel.management.repository.complain.CommentRepository;
import com.vit.hostel.management.repository.complain.ComplaintCategoryRepository;
import com.vit.hostel.management.repository.complain.ComplaintRepository;
import com.vit.hostel.management.repository.complain.ComplaintSubCategoryRepository;
import com.vit.hostel.management.service.ComplaintService;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ComplaintServiceImpl implements ComplaintService {
    private final ComplaintCategoryRepository complaintCategoryRepository;
    private final CommentRepository commentRepository;
    private final ComplaintSubCategoryRepository complaintSubCategoryRepository;
    private final ComplaintRepository complaintRepository;
    private  final StudentRepository studentRepository;

    ComplaintServiceImpl(ComplaintCategoryRepository complaintCategoryRepository, CommentRepository commentRepository
            , ComplaintSubCategoryRepository complaintSubCategoryRepository
            , ComplaintRepository complaintRepository
    , StudentRepository studentRepository) {
        this.complaintCategoryRepository = complaintCategoryRepository;
        this.commentRepository = commentRepository;
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
                .studentRegNumber(complaintRequestDTO.getStudentRegNumber())
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
            StudentInfoEntity student = studentRepository.findByRegNumber(item.getStudentRegNumber());
            return ComplaintResponseDTO.builder()
                    .complaintId(item.getComplaintId())
                    .studentRegNumber(item.getStudentRegNumber())
                    .studentName(student.getStudentName())
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
        StudentInfoEntity student = studentRepository.findByRegNumber(complaint.getStudentRegNumber());
        ComplaintCategoryEntity category = complaintCategoryRepository.findByCategoryId(complaint.getCategoryId());
        ComplaintSubCategoryEntity subCategory = complaintSubCategoryRepository.findBySubCategoryId(complaint.getSubCategoryId());
        ComplaintCommentEntity comment = commentRepository.findByComplaintId(complainId);
        return ComplainDetailDTO.builder()
                // complain information
                .complainId(complainId)
                .status(complaint.getStatus())
                .description(complaint.getDescription())
                .categoryName(category.getCategoryName())
                .subcategoryName(subCategory.getSubcategoryName())
                .submittedAt(String.valueOf(complaint.getSubmittedAt()))
                .updatedAt(String.valueOf(complaint.getUpdatedAt()))
                .comment(comment==null?null:comment.getComment())
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

    @Override
    public String updateComplain(ComplaintUpdateRequestDTO complaintUpdateRequestDTO) {
        ComplaintEntity complain = complaintRepository.findById(complaintUpdateRequestDTO.getComplaintId()).orElseThrow();
        ComplaintCommentEntity comment = commentRepository.findByComplaintId(complaintUpdateRequestDTO.getComplaintId());
        complain.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        complain.setStatus(complaintUpdateRequestDTO.getStatus());
        complain.setAdminRegNumber(complaintUpdateRequestDTO.getAdminRegNumber());
        complaintRepository.save(complain);
        if(complaintUpdateRequestDTO.getComment() == null || complaintUpdateRequestDTO.getComment().isEmpty() ){

        }else{
            if(comment == null){
                comment = ComplaintCommentEntity.builder()
                        .comment(complaintUpdateRequestDTO.getComment())
                        .commentedAt(new Timestamp(System.currentTimeMillis()))
                        .complaintId(complaintUpdateRequestDTO.getComplaintId())
                        .build();
            }else{
                comment.setComment(complaintUpdateRequestDTO.getComment());
                comment.setCommentedAt(new Timestamp(System.currentTimeMillis()));
            }
            commentRepository.save(comment);
        }
        return "complain Updated successfully";
    }
}
