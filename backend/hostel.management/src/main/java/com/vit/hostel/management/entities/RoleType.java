package com.vit.hostel.management.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "role_types")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoleType {
    @Id
    @Column(name = "role_type_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roleTypeId;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_name")
    private RoleName roleName;
}
