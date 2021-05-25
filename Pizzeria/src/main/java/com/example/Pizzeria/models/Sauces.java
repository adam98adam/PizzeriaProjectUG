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
@Table(name = "Sauces")
@JsonIgnoreProperties(value = { "orders" })
public class Sauces {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message="Name can not be null")
    @Column(unique=true)
    @Pattern(regexp = "[A-Z][A-Za-z ]{3,}")
    private String name;

    @NotNull(message = "Price can not be null")
    @Column(columnDefinition = "Double precision not null CHECK (price >= 0.50 AND price <= 3.00)")
    @DecimalMin(value = "0.50")
    @DecimalMax(value = "3.00")
    private Double price;

    @OneToMany(targetEntity = Orders.class,mappedBy="sauce",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Orders> orders;

    /*
    public Sauces(){}
    public Sauces(String name,Double price) {
        this.name = name;
        this.price = price;
    }

*/
}
