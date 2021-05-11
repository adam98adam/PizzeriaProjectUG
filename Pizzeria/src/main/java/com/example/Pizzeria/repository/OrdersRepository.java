package com.example.Pizzeria.repository;

import com.example.Pizzeria.models.Account;
import com.example.Pizzeria.models.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrdersRepository extends JpaRepository<Orders,Integer> {

    //@Query(value = "SELECT * FROM Orders o WHERE o.user_id = :id",nativeQuery = true)
    //Optional<List<Orders>> findOrdersByUserId(@Param("id") Integer id);

    Optional<List<Orders>> findByUser_Id(@Param("id") Integer id);

    @Query(value = "DELETE FROM Orders o WHERE o.user_id = :id",nativeQuery = true)
    void deleteOrdersByUserId(@Param("id") Integer id);

    @Query(value = "SELECT *  FROM Users u INNER JOIN Orders o  ON u.id = o.user_id WHERE u.id = :id",nativeQuery = true)
    Optional<List<Orders>> findOrdersByUserId(@Param("id") Integer id);
}
