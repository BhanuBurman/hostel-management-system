package com.vit.hostel.management.controllers;

import com.vit.hostel.management.dtos.StudentDTO;
import com.vit.hostel.management.dtos.authentication.AuthRequestDTO;
import com.vit.hostel.management.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody AuthRequestDTO loginInfo){
        return ResponseEntity.ok(authService.verify(loginInfo));
    }

    @PostMapping("/signup-student")
    public ResponseEntity<String> signupStudent(@RequestBody StudentDTO studentDetails){
        return ResponseEntity.ok(authService.registerStudent(studentDetails));
    }
}
