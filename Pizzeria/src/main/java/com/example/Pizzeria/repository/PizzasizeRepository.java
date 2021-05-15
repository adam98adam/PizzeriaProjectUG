package com.example.Pizzeria.repository;

import com.example.Pizzeria.models.Pizzasize;
import com.example.Pizzeria.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PizzasizeRepository extends JpaRepository<Pizzasize,Integer> {

    List<Pizzasize> findByNameOrDiameterOrPizzacostfactor(String name,Integer diameter, Double pizzacostfactor);

}
