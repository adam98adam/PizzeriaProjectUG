package com.example.Pizzeria.repository;

import com.example.Pizzeria.models.Account;
import com.example.Pizzeria.models.Crust;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CrustRepository extends JpaRepository<Crust,Integer> {

    List<Crust> findByCrustOrPrice(String crust,Double price);

}
