package com.example.Pizzeria.models;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Entity
@Setter
@Getter
@ToString
@Table(name = "Address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Column(nullable = false)
    @Pattern(regexp = "[A-Z][a-z]{3,}")
    private String city;

    @NotBlank
    @Column(nullable = false)
    @Pattern(regexp = "[A-Z][a-z]{3,}")
    private String street;

    @NotBlank
    @Column(columnDefinition = "Integer not null CHECK (number >= 1 AND number <= 100)")
    @Min(1)
    @Max(100)
    private Integer number;

    @OneToOne(targetEntity = User.class)
    @JoinColumn(name = "user_id", referencedColumnName = "id",nullable = false)
    private User user;

    public Address(){};
    public Address(String city, String street, Integer id, User user) {
        this.city = city;
        this.street = street;
        this.id = id;
        this.user = user;

    }

}
