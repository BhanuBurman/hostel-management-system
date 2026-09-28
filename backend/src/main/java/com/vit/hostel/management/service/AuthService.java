package com.vit.hostel.management.service;

import com.vit.hostel.management.dtos.StudentDTO;
import com.vit.hostel.management.dtos.authentication.AdminDTO;
import com.vit.hostel.management.dtos.authentication.AuthRequestDTO;
import com.vit.hostel.management.dtos.authentication.UserCommonDetailsDTO;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    String registerStudent(StudentDTO studentDetails);

    ResponseEntity<?> verify(AuthRequestDTO loginInfo);

    UserCommonDetailsDTO getUserCommonDetails(String token);

    StudentDTO getStudentDetailsByRegNumber(String regNumber);

    String registerAdmin(AdminDTO adminDTO);
}
