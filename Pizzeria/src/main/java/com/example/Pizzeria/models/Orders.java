package com.example.Pizzeria.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

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
    @JoinColumn(name = "crust_id", referencedColumnName = "id")
    //@JsonBackReference(value = "drinks-orders")
    //@JsonManagedReference(value = "drinks-orders")
    private Crust crust;

    @ManyToOne
    @JoinColumn(name = "pizzasize_id", referencedColumnName = "id")
    //@JsonBackReference(value = "drinks-orders")
    //@JsonManagedReference(value = "drinks-orders")
    private Pizzasize pizzasize;

    @ManyToOne
    @JoinColumn(name = "cutstyle_id", referencedColumnName = "id")
    //@JsonBackReference(value = "drinks-orders")
    //@JsonManagedReference(value = "drinks-orders")
    private Cutstyle cutstyle;

    @ManyToOne
    @JoinColumn(name = "drink_id", referencedColumnName = "id")
    //@JsonBackReference(value = "drinks-orders")
    //@JsonManagedReference(value = "drinks-orders")
    private Drinks drink;

    @ManyToOne
    @JoinColumn(name = "sauce_id", referencedColumnName = "id")
    //@JsonBackReference(value = "drinks-orders")
    //@JsonManagedReference(value = "drinks-orders")
    private Sauces sauce;


    @Temporal(TemporalType.TIMESTAMP)
//    @Column(columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT DATE_TRUNC('minute',CURRENT_TIMESTAMP::timestamp)")
    @Column(columnDefinition = "DATE DEFAULT DATE_TRUNC('minute',CURRENT_TIMESTAMP::timestamp)")
    private Date date;


//    @Temporal(TemporalType.TIMESTAMP)
//    @Column(nullable = false)
//    private Date timestamp;

    @PrePersist
    private void onCreate() {
        date = new Date();
    }



}
