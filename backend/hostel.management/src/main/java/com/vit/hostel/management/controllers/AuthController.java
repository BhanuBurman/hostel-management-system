package com.vit.hostel.management.controllers;

import com.vit.hostel.management.dtos.StudentDTO;
import com.vit.hostel.management.dtos.authentication.AdminDTO;
import com.vit.hostel.management.dtos.authentication.AuthRequestDTO;
import com.vit.hostel.management.dtos.authentication.UserCommonDetailsDTO;
import com.vit.hostel.management.service.AuthService;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequestDTO loginInfo){
        return authService.verify(loginInfo);
    }

    @PostMapping("/signup-student")
    public ResponseEntity<String> signupStudent(@RequestBody StudentDTO studentDetails){
        return ResponseEntity.ok(authService.registerStudent(studentDetails));
    }

    @PostMapping("/signup-admin")
    public ResponseEntity<String> signupAdmin(@RequestBody AdminDTO adminDTO){
        return ResponseEntity.ok(authService.registerAdmin(adminDTO));
    }

    @PostMapping("/user-details")
    public ResponseEntity<UserCommonDetailsDTO> getUserDetails(@RequestBody String token){
        return ResponseEntity.ok(authService.getUserCommonDetails(token));
    }

    @PostMapping("/student-full-details")
    public ResponseEntity<StudentDTO> getStudentFullDetailsByRegNumber(@RequestBody String regNumber){
        return ResponseEntity.ok(authService.getStudentDetailsByRegNumber(regNumber));
    }
}
