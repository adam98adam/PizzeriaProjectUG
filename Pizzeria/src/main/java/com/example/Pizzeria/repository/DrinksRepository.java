package com.example.Pizzeria.repository;

import com.example.Pizzeria.models.Account;
import com.example.Pizzeria.models.Drinks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DrinksRepository extends JpaRepository<Drinks,Integer> {
    List<Drinks> findByName(String name);
}
