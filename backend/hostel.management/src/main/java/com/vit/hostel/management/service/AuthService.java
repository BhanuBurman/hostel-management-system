package com.vit.hostel.management.service;

import com.vit.hostel.management.dtos.StudentDTO;
import com.vit.hostel.management.dtos.authentication.AuthRequestDTO;
import com.vit.hostel.management.dtos.authentication.UserCommonDetailsDTO;

public interface AuthService {

    String registerStudent(StudentDTO studentDetails);

    String verify(AuthRequestDTO loginInfo);

    UserCommonDetailsDTO getUserCommonDetails(String token);
}
