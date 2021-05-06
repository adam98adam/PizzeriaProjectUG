package com.example.Pizzeria.repository;

import com.example.Pizzeria.models.Pizza;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PizzaRepository extends JpaRepository<Pizza,Integer> {
}
