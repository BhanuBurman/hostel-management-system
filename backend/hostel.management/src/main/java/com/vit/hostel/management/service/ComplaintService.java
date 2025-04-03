package com.vit.hostel.management.service;


import com.vit.hostel.management.dtos.complainDtos.*;

import java.util.List;

public interface ComplaintService {
    List<ComplaintCategoryDTO> getAllComplaintCategories();

    List<ComplaintSubCategoryDTO> getAllComplaintSubCategories();

    String addComplaint(ComplaintRequestDTO complaintRequestDTO);

    List<ComplaintResponseDTO> getAllComplaints();

    ComplainDetailDTO getComplainDetailsByID(Integer complainId);
}
