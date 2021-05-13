package com.example.Pizzeria.models;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
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
    private String name;

    @NotBlank
    private Integer diameter;

    @NotBlank
    private float pizzacostfactor;

    @OneToMany(targetEntity = Orders.class,mappedBy="pizzasize")
    //@JsonBackReference(value = "user-account")
    //@JsonBackReference(value = "bakestyle-orders")
    //@JsonManagedReference(value = "bakestyle-orders")
    private List<Orders> orders;




}
