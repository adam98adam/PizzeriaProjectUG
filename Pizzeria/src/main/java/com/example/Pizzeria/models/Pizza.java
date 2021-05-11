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
@Table(name = "Pizza")
@JsonIgnoreProperties(value = { "orders" })
public class Pizza {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private String name;


    @NotBlank
    @Column(columnDefinition="character varying (300)")
    private String description;

    @NotBlank
    private float price;


    @NotBlank
    private String image;

    @OneToMany(targetEntity = Orders.class,mappedBy="pizza")
    //@JsonBackReference(value = "user-account")
    //@JsonBackReference(value = "pizza-orders")
    //@JsonManagedReference(value = "pizza-orders")
    //@JsonIgnore
    private List<Orders> orders;


}
