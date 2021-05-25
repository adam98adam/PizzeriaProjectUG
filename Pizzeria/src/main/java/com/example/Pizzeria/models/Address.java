package com.example.Pizzeria.models;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Setter
@Getter
@ToString
@Table(name = "Address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "City can not be null")
    @Column(nullable = false)
    @Pattern(regexp = "[A-Z][a-z]{3,}")
    private String city;

    @NotNull(message = "Street can not be null")
    @Column(nullable = false)
    @Pattern(regexp = "[A-Z][a-z]{3,}")
    private String street;

    @NotNull(message = "Number can not be null")
    @Column(columnDefinition = "Integer not null CHECK (number >= 1 AND number <= 100)")
    @Size(min = 1,max = 100,message = "Number must be between 1 and 100")
    private Integer number;

    @OneToOne(targetEntity = User.class)
    @JoinColumn(name = "user_id", referencedColumnName = "id",nullable = false)
    private User user;

    /*
    public Address(){};
    public Address(String city, String street, Integer id, User user) {
        this.city = city;
        this.street = street;
        this.id = id;
        this.user = user;

    }
     */

}
