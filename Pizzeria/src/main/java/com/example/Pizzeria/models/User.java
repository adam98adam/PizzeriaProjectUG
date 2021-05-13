package com.example.Pizzeria.models;


import com.fasterxml.jackson.annotation.*;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Set;

@Entity
@Setter
@Getter
@ToString
@Table(name = "Users")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
@JsonIgnoreProperties(value = { "orders","account","address" })
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private String name;

    @NotBlank
    private String surname;

    @NotBlank
    @Column(unique=true)
    private String email;

    @NotBlank
    @Column(unique=true)
    private String phonenumber;


    @Column(columnDefinition = "boolean default true")
    private Boolean customer;


    @OneToOne(targetEntity = Account.class,mappedBy = "user",cascade = CascadeType.ALL, orphanRemoval = true)
    //@JsonManagedReference
    //@JsonBackReference(value = "user-account")
    private Account account;

    @OneToOne(targetEntity = Address.class,mappedBy = "user",cascade = CascadeType.ALL, orphanRemoval = true)
    //@JsonManagedReference
    //@JsonBackReference(value = "user-address")
    private Address address;


    @OneToMany(targetEntity = Orders.class,mappedBy="user",cascade = CascadeType.ALL, orphanRemoval = true)
    //@JsonBackReference(value = "user-account")
    //@JsonBackReference(value = "user-orders")
    //@JsonManagedReference(value = "user-orders")
    private List<Orders> orders;


    public User(){}
    public User(String name,String surname,String email,String phonenumber,Boolean customer){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phonenumber = phonenumber;
        this.customer = customer;
    }



}
