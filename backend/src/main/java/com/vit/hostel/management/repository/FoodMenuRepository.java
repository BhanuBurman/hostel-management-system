package com.vit.hostel.management.repository;

import com.vit.hostel.management.entities.FoodMenuEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodMenuRepository extends JpaRepository<FoodMenuEntity, Integer> {
}
