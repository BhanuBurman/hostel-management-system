package com.vit.hostel.management.repository;

import com.vit.hostel.management.entities.StudentInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<StudentInfoEntity, Integer> {
}
