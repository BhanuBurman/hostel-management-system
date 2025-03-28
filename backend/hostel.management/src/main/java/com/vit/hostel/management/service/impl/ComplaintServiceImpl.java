package com.vit.hostel.management.service.impl;

import com.vit.hostel.management.dtos.ComplaintCategoryDTO;
import com.vit.hostel.management.dtos.ComplaintSubCategoryDTO;
import com.vit.hostel.management.entities.complain.ComplaintCategoryEntity;
import com.vit.hostel.management.entities.complain.ComplaintSubCategoryEntity;
import com.vit.hostel.management.repository.complain.ComplaintCategoryRepository;
import com.vit.hostel.management.repository.complain.ComplaintSubCategoryRepository;
import com.vit.hostel.management.service.ComplaintService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintServiceImpl implements ComplaintService {
    private final ComplaintCategoryRepository complaintCategoryRepository;
    private final ComplaintSubCategoryRepository complaintSubCategoryRepository;

    ComplaintServiceImpl(ComplaintCategoryRepository complaintCategoryRepository
    ,ComplaintSubCategoryRepository complaintSubCategoryRepository
                         ){
        this.complaintCategoryRepository = complaintCategoryRepository;
        this.complaintSubCategoryRepository = complaintSubCategoryRepository;
    }
    @Override
    public List<ComplaintCategoryDTO> getAllComplaintCategories(){
        List<ComplaintCategoryEntity> complaintCategoryEntities = complaintCategoryRepository.findAllByOrderByCategoryId();
        return complaintCategoryEntities.stream().map((item) ->{
            return ComplaintCategoryDTO.builder().categoryName(item.getCategoryName()).id(item.getCategoryId()).build();
        }).toList();
    }

    @Override
    public List<ComplaintSubCategoryDTO> getAllComplaintSubCategories() {
        List<ComplaintSubCategoryEntity> complaintSubCategoryEntities = complaintSubCategoryRepository.findAllByOrderBySubCategoryId();
        return complaintSubCategoryEntities.stream().map((item) ->{
            return ComplaintSubCategoryDTO.builder().subCategoryId(item.getSubCategoryId()).subCategoryName(item.getSubcategoryName()).categoryId(item.getCategory().getCategoryId()).build();
        }).toList();
    }
}
