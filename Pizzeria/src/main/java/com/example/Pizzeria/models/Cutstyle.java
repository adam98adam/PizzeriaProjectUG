package com.example.Pizzeria.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.List;


@Entity
@Setter
@Getter
@ToString
@Table(name = "Cutstyle")
@JsonIgnoreProperties(value = { "orders" })
public class Cutstyle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "Name can not be null")
    @Column(unique=true,nullable = false)
    @Pattern(regexp = "[A-Z][A-Za-z0-9 ]{3,}")
    private String name;

    @OneToMany(targetEntity = Orders.class,mappedBy="cutstyle",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Orders> orders;
}
