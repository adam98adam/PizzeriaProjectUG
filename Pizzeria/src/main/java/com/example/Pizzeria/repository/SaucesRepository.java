package com.example.Pizzeria.repository;

import com.example.Pizzeria.models.Drinks;
import com.example.Pizzeria.models.Sauces;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaucesRepository extends JpaRepository<Sauces,Integer> {

    List<Sauces> findByName(String name);

}
