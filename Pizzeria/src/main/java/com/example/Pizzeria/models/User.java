package com.example.Pizzeria.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

@Entity
@Setter
@Getter
@ToString
@Table(name = "Users")
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


    @OneToOne(targetEntity = Account.class,mappedBy = "user")
    @JsonManagedReference
    private Account account;


    public User(){}
    public User(String name,String surname,String email,String phonenumber,Boolean customer){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phonenumber = phonenumber;
        this.customer = customer;
    }

}
