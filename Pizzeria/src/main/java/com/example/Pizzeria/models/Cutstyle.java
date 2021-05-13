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
@Table(name = "Cutstyle")
@JsonIgnoreProperties(value = { "orders" })
public class Cutstyle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private String name;

    @OneToMany(targetEntity = Orders.class,mappedBy="cutstyle",cascade = CascadeType.ALL, orphanRemoval = true)
    //@JsonBackReference(value = "user-account")
    //@JsonBackReference(value = "bakestyle-orders")
    //@JsonManagedReference(value = "bakestyle-orders")
    private List<Orders> orders;
}
