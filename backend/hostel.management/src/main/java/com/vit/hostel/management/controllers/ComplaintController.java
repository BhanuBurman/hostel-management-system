package com.vit.hostel.management.controllers;

import com.vit.hostel.management.dtos.ComplaintCategoryDTO;
import com.vit.hostel.management.dtos.ComplaintSubCategoryDTO;
import com.vit.hostel.management.service.ComplaintService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/complain")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
@Tag(name = "Complaint APIs", description = "This is used for fetching data for complaint related operations")
public class ComplaintController {
    private final ComplaintService complaintService;
    ComplaintController(ComplaintService complaintService){
        this.complaintService = complaintService;
    }
    @GetMapping("/get-all-complaint-categories")
    public ResponseEntity<List<ComplaintCategoryDTO>> getAllComplaintCategory(){
        return ResponseEntity.ok(complaintService.getAllComplaintCategories());
    }

    @GetMapping("/get-all-complaint-subcategories")
    public ResponseEntity<List<ComplaintSubCategoryDTO>> getAllComplaintSubCategory(){
        return ResponseEntity.ok(complaintService.getAllComplaintSubCategories());
    }
}
