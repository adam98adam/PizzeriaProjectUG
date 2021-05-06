package com.example.Pizzeria.repository;

import com.example.Pizzeria.models.Pizzasize;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PizzasizeRepository extends JpaRepository<Pizzasize,Integer> {
}
