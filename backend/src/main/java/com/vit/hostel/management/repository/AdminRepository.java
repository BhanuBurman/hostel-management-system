package com.vit.hostel.management.repository;

import com.vit.hostel.management.entities.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity, String> {
    AdminEntity findByRegNumber(String regNumber);
}
