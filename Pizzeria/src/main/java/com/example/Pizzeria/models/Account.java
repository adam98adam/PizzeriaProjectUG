package com.example.Pizzeria.models;

import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;


@Entity
@Getter
@Setter
@ToString
@Table(name = "Accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Column(unique=true,nullable = false)
    @Pattern(regexp = "[a-zA-Z][a-zA-Z0-9]{3,}")
    private String login;

    @NotBlank
    @Column(nullable = false)
    @Pattern(regexp = "\\w+(\\w+[.@?]\\w+)*")
    private String password;


    @OneToOne(targetEntity = User.class)
    @JoinColumn(name = "user_id", referencedColumnName = "id",nullable = false)
    private User user;


    public Account() {}

    public Account(String login,String password,User user) {
        this.login = login;
        this.password = password;
        this.user = user;
    }


}
