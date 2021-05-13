package com.example.Pizzeria.repository;

import com.example.Pizzeria.models.Account;
import com.example.Pizzeria.models.Cutstyle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CutstyleRepository extends JpaRepository<Cutstyle,Integer> {
    List<Cutstyle> findByName(String name);
}
