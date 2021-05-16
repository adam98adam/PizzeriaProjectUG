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
@Table(name = "Pizzasize")
@JsonIgnoreProperties(value = { "orders" })
public class Pizzasize {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Column(unique=true,nullable = false)
    @Pattern(regexp = "[A-Z][a-z]{3,}")
    private String name;

    @NotBlank
    //@Column(unique=true,nullable = false)
    @Column(columnDefinition = "Integer not null unique CHECK (diameter >= 10 AND diameter <= 65)")
    @Min(10)
    @Max(65)
    private Integer diameter;

    @NotBlank
    //@Column(unique=true,nullable = false)
    @Column(columnDefinition = "Double precision not null unique CHECK (pizzacostfactor >= 1.00 AND pizzacostfactor <= 2.50)")
    @DecimalMin(value = "1.00")
    @DecimalMax(value = "2.50")
    private Double pizzacostfactor;

    @OneToMany(targetEntity = Orders.class,mappedBy="pizzasize",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Orders> orders;




}
