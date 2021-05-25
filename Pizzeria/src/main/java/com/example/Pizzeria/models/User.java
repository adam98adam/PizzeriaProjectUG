package com.example.Pizzeria.models;


import com.fasterxml.jackson.annotation.*;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.List;
import java.util.Set;

@Entity
@Setter
@Getter
@ToString
@Table(name = "Users")
@JsonIgnoreProperties(value = { "orders","account","address" })
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "Name can not be null")
    @Column(nullable = false)
    @Pattern(regexp = "[A-Z][a-z]{2,}")
    private String name;

    @NotNull(message = "Surname can not be null")
    @Column(nullable = false)
    @Pattern(regexp = "[A-Z][a-z]{3,}")
    private String surname;

    @NotNull(message = "Email can not be null")
    @Column(unique=true,nullable = false)
    @Pattern(regexp = "([a-z0-9]+\\.?)+[a-z0-9]+@[a-z]{2,}\\.[a-z]{2,}")
    private String email;

    @NotNull(message = "Phonenumber can not be null")
    @Column(unique=true,nullable = false)
    @Pattern(regexp = "(\\+[0-9]{2,3})?[0-9]{9}")
    private String phonenumber;

    @NotNull(message = "Customer can not be null")
    @Column(columnDefinition = "boolean default true not null")
    private Boolean customer;


    @OneToOne(targetEntity = Account.class,mappedBy = "user",cascade = CascadeType.ALL, orphanRemoval = true)
    private Account account;

    @OneToOne(targetEntity = Address.class,mappedBy = "user",cascade = CascadeType.ALL, orphanRemoval = true)
    private Address address;


    @OneToMany(targetEntity = Orders.class,mappedBy="user",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Orders> orders;

/*
    public User(){}
    public User(String name,String surname,String email,String phonenumber,Boolean customer){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phonenumber = phonenumber;
        this.customer = customer;
    }

 */



}
