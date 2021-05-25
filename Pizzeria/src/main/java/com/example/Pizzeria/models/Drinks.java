package com.example.Pizzeria.models;

import com.fasterxml.jackson.annotation.*;
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
@Table(name = "Drinks")
@JsonIgnoreProperties(value = { "orders" })
public class Drinks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "Name can not be null")
    @Column(unique=true,nullable = false)
    @Pattern(regexp = "[A-Z][A-Za-z-]{3,}")
    private String name;

    @NotNull(message = "Price can not be null")
    @Column(columnDefinition = "Double precision not null CHECK (price >= 1.00 AND price <= 6.00)")
    @DecimalMin(value = "1.00")
    @DecimalMax(value = "6.00")
    private Double price;

    @OneToMany(targetEntity = Orders.class,mappedBy="drink",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Orders> orders;
}
