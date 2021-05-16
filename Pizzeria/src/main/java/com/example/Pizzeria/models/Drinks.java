package com.example.Pizzeria.models;

import com.fasterxml.jackson.annotation.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import javax.persistence.*;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.List;

@Entity
@Setter
@Getter
@ToString
@Table(name = "Drinks")
@JsonIgnoreProperties(value = { "orders" })
public class Drinks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Column(unique=true,nullable = false)
    @Pattern(regexp = "[A-Z][a-z]{3,}")
    private String name;

    @NotBlank
    //@Column(nullable = false)
    @Column(columnDefinition = "Double precision not null CHECK (price >= 1.00 AND price <= 6.00)")
    @DecimalMin(value = "1.00")
    @DecimalMax(value = "6.00")
    private Double price;

    @OneToMany(targetEntity = Orders.class,mappedBy="drink",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Orders> orders;
}
