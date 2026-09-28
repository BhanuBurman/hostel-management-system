package com.vit.hostel.management.entities.complain;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name="complaints")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ComplaintEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "complaint_id")
    private Integer complaintId;

    @Column(name = "student_reg_number")
    private String studentRegNumber;

    @Column(name = "category_id")
    private Integer categoryId;

    @Column(name = "subcategory_id")
    private Integer subCategoryId;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    private String status;

    @Column(name = "submitted_at")
    private Timestamp submittedAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "admin_reg_number")
    private String adminRegNumber;
}
