package com.example.Pizzeria.repository;

import com.example.Pizzeria.models.Account;
import com.example.Pizzeria.models.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrdersRepository extends JpaRepository<Orders,Integer> {

    Optional<List<Orders>> findByUser_Id(@Param("id") Integer id);

}
