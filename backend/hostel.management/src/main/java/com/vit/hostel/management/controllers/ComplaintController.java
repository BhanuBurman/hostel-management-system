package com.vit.hostel.management.controllers;

import com.vit.hostel.management.dtos.complainDtos.*;
import com.vit.hostel.management.service.ComplaintService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/complain")
@CrossOrigin
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

    // TODO: get all complaints by user reg number
    @GetMapping("/get-all-complaints")
    public ResponseEntity<List<ComplaintResponseDTO>> getAllComplaints(){
        return ResponseEntity.ok(complaintService.getAllComplaints());
    }

    @GetMapping("/get-complain-detailsById/{complainId}")
    public ResponseEntity<ComplainDetailDTO> getComplainDetailsByID(@PathVariable Integer complainId){
        return ResponseEntity.ok(complaintService.getComplainDetailsByID(complainId));
    }

    @PostMapping("/add-complaint")
    public ResponseEntity<String> addComplaint(@RequestBody ComplaintRequestDTO complaintRequestDTO){
        return ResponseEntity.ok(complaintService.addComplaint(complaintRequestDTO));
    }

    @PutMapping("/update-complaint")
    public ResponseEntity<String> updateComplaint(@RequestBody ComplaintUpdateRequestDTO complaintUpdateRequestDTO){
        return ResponseEntity.ok(complaintService.updateComplain(complaintUpdateRequestDTO));
    }

}
