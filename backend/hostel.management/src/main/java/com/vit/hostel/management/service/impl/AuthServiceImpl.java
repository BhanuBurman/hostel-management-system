package com.vit.hostel.management.service.impl;

import com.vit.hostel.management.dtos.StudentDTO;
import com.vit.hostel.management.dtos.authentication.AuthRequestDTO;
import com.vit.hostel.management.dtos.authentication.UserDetailsDTO;
import com.vit.hostel.management.entities.StudentInfoEntity;
import com.vit.hostel.management.entities.StudentEntity;
import com.vit.hostel.management.repository.StudentRepository;
import com.vit.hostel.management.repository.UserRepository;
import com.vit.hostel.management.service.AuthService;
import com.vit.hostel.management.service.JwtService;
import com.vit.hostel.management.service.RoleBasedAuthToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.Year;

@Service
public class AuthServiceImpl implements AuthService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    AuthServiceImpl(StudentRepository studentRepository, UserRepository userRepository, AuthenticationManager authenticationManager, JwtService jwtService){
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }
    @Override
    public String registerStudent(StudentDTO studentDetails) {
        StudentInfoEntity studentInfoEntity = StudentInfoEntity.builder()
                .studentEmail(studentDetails.getStudentEmail())
                .dob(Date.valueOf(studentDetails.getStudentDOB()))
                .studentName(studentDetails.getStudentName())
                .address(studentDetails.getStudentAddress())
                .regNumber(studentDetails.getRegNumber())
                .phoneNo(studentDetails.getStudentPhone())
                .gender(studentDetails.getStudentGender())
                .roomNumber(studentDetails.getRoomNumber())
                .admissionYear(Year.of(2025))
                .branch(studentDetails.getStudentBranch())
                .build();
        StudentEntity student = StudentEntity.builder()
                .regNumber(studentDetails.getRegNumber())
                .password(encoder.encode(studentDetails.getPassword()))
                .build();
        userRepository.save(student);
        studentRepository.save(studentInfoEntity);
        return "Success";
    }

    @Override
    public String verify(AuthRequestDTO loginInfo) {
        Authentication authentication = authenticationManager
                .authenticate(new RoleBasedAuthToken(loginInfo.getRegNumber(),
                        loginInfo.getPassword(),
                        loginInfo.getRoleType()));
        if (authentication.isAuthenticated()){
            return jwtService.generateToken(loginInfo.getRegNumber());
        }
        return "fail";
    }

    private void registerUser(UserDetailsDTO userDetailsDTO){

    }
}
