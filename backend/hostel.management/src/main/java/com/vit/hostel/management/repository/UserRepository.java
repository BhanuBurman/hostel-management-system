package com.vit.hostel.management.repository;

import com.vit.hostel.management.entities.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<StudentEntity, Integer> {
    StudentEntity findByRegNumber(String username);
}
