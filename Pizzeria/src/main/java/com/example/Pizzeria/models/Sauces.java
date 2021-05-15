package com.example.Pizzeria.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Table(name = "Sauces")
@JsonIgnoreProperties(value = { "orders" })
public class Sauces {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Column(unique=true)
    @Pattern(regexp = "[A-Z][a-z]{3,}")
    private String name;

    @NotBlank
    @Column(nullable = false)
    @DecimalMin(value = "0.50")
    @DecimalMax(value = "3,00")
    private Double price;

    @OneToMany(targetEntity = Orders.class,mappedBy="sauce",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Orders> orders;


}
