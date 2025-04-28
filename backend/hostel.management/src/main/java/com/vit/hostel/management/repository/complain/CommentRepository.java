package com.vit.hostel.management.repository.complain;

import com.vit.hostel.management.entities.complain.ComplaintCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<ComplaintCommentEntity, Integer> {
    ComplaintCommentEntity findByComplaintId(Integer complaintId);
}
