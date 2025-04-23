package com.vit.hostel.management.entities;

//import com.vit.hostel.management.enums.MealConverter;
import com.vit.hostel.management.enums.MealType;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "food_menu")
public class FoodMenuEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String day;

    @Enumerated(EnumType.STRING)
    private MealType mealType;

    private String foodItems;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    private Date createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }
}
