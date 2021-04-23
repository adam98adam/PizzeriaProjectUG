package com.example.Pizzeria.models;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

    @NotBlank
    private Boolean customer;

    @OneToOne(mappedBy = "user")
    private Account account;
}
