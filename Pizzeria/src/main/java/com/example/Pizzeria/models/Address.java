package com.example.Pizzeria.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Setter
@Getter
@ToString
@Table(name = "UserAddress")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private String city;

    @NotBlank
    private String street;

    @NotBlank
    private Integer number;

    @OneToOne(targetEntity = User.class)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    //@JsonBackReference
    //@JsonManagedReference(value = "user-address")
    private User user;

    public Address(){};
    public Address(String city, String street, Integer id, User user) {
        this.city = city;
        this.street = street;
        this.id = id;
        this.user = user;

    }

}
