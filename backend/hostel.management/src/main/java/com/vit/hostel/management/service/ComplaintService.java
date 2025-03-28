package com.vit.hostel.management.service;


import com.vit.hostel.management.dtos.ComplaintCategoryDTO;
import com.vit.hostel.management.dtos.ComplaintSubCategoryDTO;

import java.util.List;

public interface ComplaintService {
    public List<ComplaintCategoryDTO> getAllComplaintCategories();

    List<ComplaintSubCategoryDTO> getAllComplaintSubCategories();
}
