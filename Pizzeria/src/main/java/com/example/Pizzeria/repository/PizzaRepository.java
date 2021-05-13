package com.example.Pizzeria.repository;

import com.example.Pizzeria.models.Account;
import com.example.Pizzeria.models.Pizza;
import com.example.Pizzeria.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PizzaRepository extends JpaRepository<Pizza,Integer> {
    List<Pizza> findByNameOrDescriptionOrImage(String name, String description, String image);
}
