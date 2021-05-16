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
@Table(name = "Pizza")
@JsonIgnoreProperties(value = { "orders" })
public class Pizza {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Column(unique=true,nullable = false)
    @Pattern(regexp = "[A-Z][a-z]{3,}")
    private String name;


    @NotBlank
    @Column(columnDefinition="character varying (300) not null unique")
    @Pattern(regexp = "[A-Z][a-z ]{9,}")
    private String description;

    @NotBlank
    //@Column(nullable = false)
    @Column(columnDefinition = "Double precision not null unique CHECK (price >= 10.00 AND price <= 30.00)")
    @DecimalMin(value = "10.00")
    @DecimalMax(value = "30.00")
    private Double price;

    @NotBlank
    @Column(unique = true,nullable = false)
    @Pattern(regexp = "((http(s)?)?:\\/\\/.*\\.(?:png|jpg))")
    private String image;

    @OneToMany(targetEntity = Orders.class,mappedBy="pizza",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Orders> orders;


}
