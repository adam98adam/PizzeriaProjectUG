package com.example.Pizzeria.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;


@Entity
@Setter
@Getter
@ToString
@Table(name = "Cutstyle")
public class Cutstyle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private String name;
}