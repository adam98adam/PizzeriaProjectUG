package com.example.Pizzeria.models;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.List;

@Entity
@Setter
@Getter
@ToString
@Table(name = "Crust")
@JsonIgnoreProperties(value = { "orders" })
public class Crust {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "Crust can not be null")
    @Column(unique=true,nullable = false)
    @Pattern(regexp = "[A-Z][a-z]{3,}")
    private String crust;

    @NotNull(message = "Price can not be null")
    @Column(columnDefinition = "Double precision not null unique CHECK (price >= 1.00 AND price <= 6.00)")
    @DecimalMin(value = "1.00",message = "Price must be between 1.00 and 6.00")
    @DecimalMax(value = "6.00",message = "Price must be between 1.00 and 6.00")
    private Double price;

    @OneToMany(targetEntity = Orders.class,mappedBy="crust",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Orders> orders;
}
