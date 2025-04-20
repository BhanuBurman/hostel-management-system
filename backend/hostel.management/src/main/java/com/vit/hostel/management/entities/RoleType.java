package com.vit.hostel.management.entities;

import com.vit.hostel.management.enums.RoleTypeName;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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
    private RoleTypeName roleName;

//    @ManyToMany(mappedBy = "roles")
//    private List<StudentEntity> users;
}
