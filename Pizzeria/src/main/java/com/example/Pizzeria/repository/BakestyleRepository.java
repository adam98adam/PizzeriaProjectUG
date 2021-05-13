package com.example.Pizzeria.repository;

import com.example.Pizzeria.models.Account;
import com.example.Pizzeria.models.Bakestyle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BakestyleRepository extends JpaRepository<Bakestyle,Integer> {
    List<Bakestyle> findByName(String name);
}
