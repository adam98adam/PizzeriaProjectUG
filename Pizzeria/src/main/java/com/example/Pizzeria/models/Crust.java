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
@Table(name = "Crust")
@JsonIgnoreProperties(value = { "orders" })
public class Crust {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private String crust;

    @NotBlank
    private float price;

    @OneToMany(targetEntity = Orders.class,mappedBy="crust")
    //@JsonBackReference(value = "user-account")
    //@JsonBackReference(value = "bakestyle-orders")
    //@JsonManagedReference(value = "bakestyle-orders")
    private List<Orders> orders;
}
