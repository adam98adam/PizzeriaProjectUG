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
    @JoinColumn(name = "user_id", referencedColumnName = "id",nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "pizza_id", referencedColumnName = "id",nullable = false)
    private Pizza pizza;

    @ManyToOne
    @JoinColumn(name = "bakestyle_id", referencedColumnName = "id",nullable = false)
    private Bakestyle bakestyle;

    @ManyToOne
    @JoinColumn(name = "crust_id", referencedColumnName = "id",nullable = false)
    private Crust crust;

    @ManyToOne
    @JoinColumn(name = "pizzasize_id", referencedColumnName = "id",nullable = false)
    private Pizzasize pizzasize;

    @ManyToOne
    @JoinColumn(name = "cutstyle_id", referencedColumnName = "id",nullable = false)
    private Cutstyle cutstyle;

    @ManyToOne
    @JoinColumn(name = "drink_id", referencedColumnName = "id")
    private Drinks drink;

    @ManyToOne
    @JoinColumn(name = "sauce_id", referencedColumnName = "id")
    private Sauces sauce;


    @Temporal(TemporalType.TIMESTAMP)
    @Column(columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT DATE_TRUNC('minute',CURRENT_TIMESTAMP::timestamp)")
    private Date date;

    @PrePersist
    private void onCreate() {
        date = new Date();
    }



}
