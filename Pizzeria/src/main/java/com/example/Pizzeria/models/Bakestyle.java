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
@Table(name = "Bakestyle")
@JsonIgnoreProperties(value = { "orders" })
public class Bakestyle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private String name;

    @OneToMany(targetEntity = Orders.class,mappedBy="bakestyle")
    //@JsonBackReference(value = "user-account")
    //@JsonBackReference(value = "bakestyle-orders")
    //@JsonManagedReference(value = "bakestyle-orders")
    private List<Orders> orders;
}
