package com.example.Pizzeria.models;

import com.fasterxml.jackson.annotation.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.List;

@Entity
@Setter
@Getter
@ToString
@Table(name = "Bakestyle")
@JsonIgnoreProperties(value = { "orders" })
public class Bakestyle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Column(unique=true,nullable = false)
    @Pattern(regexp = "[A-Z][a-z]{3,}")
    private String name;

    @OneToMany(targetEntity = Orders.class,mappedBy="bakestyle",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Orders> orders;
}
