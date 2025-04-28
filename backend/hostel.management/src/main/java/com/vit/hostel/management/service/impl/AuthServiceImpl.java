package com.vit.hostel.management.service.impl;

import com.vit.hostel.management.dtos.StudentDTO;
import com.vit.hostel.management.dtos.authentication.AdminDTO;
import com.vit.hostel.management.dtos.authentication.AuthRequestDTO;
import com.vit.hostel.management.dtos.authentication.UserCommonDetailsDTO;
import com.vit.hostel.management.entities.AdminEntity;
import com.vit.hostel.management.entities.StudentInfoEntity;
import com.vit.hostel.management.entities.StudentEntity;
import com.vit.hostel.management.repository.AdminRepository;
import com.vit.hostel.management.repository.StudentRepository;
import com.vit.hostel.management.repository.UserRepository;
import com.vit.hostel.management.service.AuthService;
import com.vit.hostel.management.service.JwtService;
import com.vit.hostel.management.service.RoleBasedAuthToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.Year;

@Slf4j
@Service
public class AuthServiceImpl implements AuthService {

    private final AdminRepository adminRepository;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    AuthServiceImpl(AdminRepository adminRepository, StudentRepository studentRepository, UserRepository userRepository, AuthenticationManager authenticationManager, JwtService jwtService){
        this.adminRepository = adminRepository;
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
            return jwtService.generateToken(loginInfo.getRegNumber(), loginInfo.getRoleType());
        }
        return "fail";
    }

    @Override
    public UserCommonDetailsDTO getUserCommonDetails(String token) {
        String regNumber = jwtService.extractUsername(token);
        String roleType = jwtService.extractRoleType(token);
        if("Warden".equalsIgnoreCase(roleType)){
            AdminEntity admin = adminRepository.findByRegNumber(regNumber);
            return UserCommonDetailsDTO.builder()
                    .email(admin.getEmail())
                    .name(admin.getName())
                    .phone(admin.getPhone())
                    .roleType(roleType)
                    .regNumber(admin.getRegNumber())
                    .build();
        }else if("Student".equalsIgnoreCase(roleType)){
            StudentInfoEntity student = studentRepository.findByRegNumber(regNumber);
            return UserCommonDetailsDTO.builder()
                    .phone(student.getPhoneNo())
                    .regNumber(student.getRegNumber())
                    .roleType(roleType)
                    .name(student.getStudentName())
                    .email(student.getStudentEmail())
                    .roomNumber(student.getRoomNumber())
                    .build();
        }
        return null;
    }

    @Override
    public StudentDTO getStudentDetailsByRegNumber(String regNumber) {
        log.info("Reg number: {}",regNumber);
        StudentInfoEntity student = studentRepository.findByRegNumber(regNumber);
        return StudentDTO.builder()
                .regNumber(regNumber)
                .studentDOB(String.valueOf(student.getDob()))
                .studentBranch(student.getBranch())
                .studentAddress(student.getAddress())
                .studentPhone(student.getPhoneNo())
                .admissionYear(String.valueOf(student.getAdmissionYear()))
                .studentGender(student.getGender())
                .studentEmail(student.getStudentEmail())
                .roomNumber(student.getRoomNumber())
                .studentName(student.getStudentName())
                .build();
    }

    @Override
    public String registerAdmin(AdminDTO adminDTO) {
        AdminEntity admin = AdminEntity.builder()
                .phone(adminDTO.getPhone())
                .email(adminDTO.getEmail())
                .password(encoder.encode(adminDTO.getPassword()))
                .regNumber(adminDTO.getRegNumber())
                .name(adminDTO.getName())
                .build();
        adminRepository.save(admin);
        return "";
    }
}
