package com.vit.hostel.management.repository.complain;

import com.vit.hostel.management.entities.complain.ComplaintCategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintCategoryRepository extends JpaRepository<ComplaintCategoryEntity, Integer> {
    List<ComplaintCategoryEntity> findAllByOrderByCategoryId();
}
