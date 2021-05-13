package com.example.Pizzeria.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "Sauces")
@JsonIgnoreProperties(value = { "orders" })
public class Sauces {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private String name;

    @NotBlank
    private float price;

    @OneToMany(targetEntity = Orders.class,mappedBy="sauce",cascade = CascadeType.ALL, orphanRemoval = true)
    //@JsonBackReference(value = "user-account")
    //@JsonBackReference(value = "bakestyle-orders")
    //@JsonManagedReference(value = "bakestyle-orders")
    private List<Orders> orders;


}
