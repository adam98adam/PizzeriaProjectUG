package com.example.Pizzeria.models;


import com.fasterxml.jackson.annotation.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Set;

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
    private String name;

    @NotBlank
    private float price;

    @OneToMany(targetEntity = Orders.class,mappedBy="drink",cascade = CascadeType.ALL, orphanRemoval = true)
    //@JsonBackReference(value = "user-account")
    //@JsonBackReference(value = "drinks-orders")
    //@JsonManagedReference(value = "drinks-orders")
    private List<Orders> orders;
}
