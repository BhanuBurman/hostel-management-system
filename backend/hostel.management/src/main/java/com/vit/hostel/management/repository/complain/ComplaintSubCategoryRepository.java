package com.vit.hostel.management.repository.complain;

import com.vit.hostel.management.entities.complain.ComplaintSubCategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintSubCategoryRepository extends JpaRepository<ComplaintSubCategoryEntity, Integer> {
    List<ComplaintSubCategoryEntity> findAllByOrderBySubCategoryId();
}
