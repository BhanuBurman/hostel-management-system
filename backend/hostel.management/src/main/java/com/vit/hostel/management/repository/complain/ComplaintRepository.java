package com.vit.hostel.management.repository.complain;

import com.vit.hostel.management.entities.complain.ComplaintEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintRepository extends JpaRepository<ComplaintEntity, Integer> {
}
