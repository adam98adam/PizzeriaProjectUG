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
@Table(name = "Pizza")
@JsonIgnoreProperties(value = { "orders" })
public class Pizza {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "Name can not be null")
    @Column(unique=true,nullable = false)
    @Pattern(regexp = "[A-Z][a-z]{3,}")
    private String name;


    @NotNull(message = "Description can not be null")
    @Column(columnDefinition="character varying (300) not null unique")
    @Pattern(regexp = "[A-Z][A-Za-z (),-]{9,}")
    private String description;

    @NotNull(message = "Price can not be null")
    @Column(columnDefinition = "Double precision not null CHECK (price >= 10.00 AND price <= 30.00)")
    @DecimalMin(value = "10.00",message = "Price must be between 10.00 and 30.00")
    @DecimalMax(value = "30.00",message = "Price must be between 10.00 and 30.00 ")
    private Double price;

    @NotNull(message = "Image can not be null")
    @Column(unique = true,nullable = false)
    @Pattern(regexp = "((http(s)?)?:\\/\\/.*\\.(?:png|jpg))")
    private String image;

    @OneToMany(targetEntity = Orders.class,mappedBy="pizza",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Orders> orders;


}
