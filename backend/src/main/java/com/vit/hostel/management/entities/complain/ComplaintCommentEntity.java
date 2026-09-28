package com.vit.hostel.management.entities.complain;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "complaint_comments")
@Builder
@Entity
public class ComplaintCommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Integer commentId;

    @Column(name = "complaint_id")
    private Integer complaintId;

    @Column(name = "comment")
    private String comment;

    @Column(name = "commented_at")
    private Timestamp commentedAt;
}
