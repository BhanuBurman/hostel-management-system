package com.vit.hostel.management.entities.complain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "subcategories")
public class ComplaintSubCategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subcategory_id")
    private Integer subCategoryId;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "category_id")
    private ComplaintCategoryEntity category;

    @Column(name = "subcategory_name")
    private String subcategoryName;
}
