package com.vit.hostel.management.service;

import com.vit.hostel.management.dtos.StudentDTO;
import com.vit.hostel.management.dtos.authentication.AuthRequestDTO;

public interface AuthService {

    String registerStudent(StudentDTO studentDetails);

    String verify(AuthRequestDTO loginInfo);
}
