package com.vit.hostel.management.repository.complain;

import com.vit.hostel.management.entities.complain.ComplaintEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<ComplaintEntity, Integer> {
    List<ComplaintEntity> findByStudentRegNumber(String regNumber);
}
