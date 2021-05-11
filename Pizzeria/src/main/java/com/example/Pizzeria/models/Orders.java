package com.example.Pizzeria.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Setter
@Getter
@ToString
@Table(name = "Orders")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    //@JsonManagedReference(value = "user-orders")
    //@JsonBackReference(value = "user-orders")
    //@JsonManagedReference(value = "user-orders")
    private User user;

    @ManyToOne
    @JoinColumn(name = "pizza_id", referencedColumnName = "id")
    //@JsonBackReference(value = "pizza-orders")
    //@JsonManagedReference(value = "pizza-orders")
    private Pizza pizza;

    @ManyToOne
    @JoinColumn(name = "bakestyle_id", referencedColumnName = "id")
    //@JsonBackReference(value = "bakestyle-orders")
    //@JsonManagedReference(value = "bakestyle-orders")
    private Bakestyle bakestyle;

    @ManyToOne
    @JoinColumn(name = "drink_id", referencedColumnName = "id")
    //@JsonBackReference(value = "drinks-orders")
    //@JsonManagedReference(value = "drinks-orders")
    private Drinks drink;


}
