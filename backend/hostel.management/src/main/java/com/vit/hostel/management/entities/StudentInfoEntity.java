package com.vit.hostel.management.entities;


import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.time.Year;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "students_info")
public class StudentInfoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Integer studentId;

    @Column(name = "name")
    private String studentName;

    @Column(name = "email")
    private String studentEmail;

    @Column(name = "phone")
    private String phoneNo;

    @Column(name = "room_number")
    private String roomNumber;

    @Column(name = "reg_number")
    private String regNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "gender")
    private String gender;

    @Column(name = "dob")
    private Date dob;

    @Column(name = "branch")
    private String branch;

    @Column(name = "admission_year")
    private Year admissionYear;
}
