package com.example.Pizzeria.repository;

import com.example.Pizzeria.models.Account;
import com.example.Pizzeria.models.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account,Integer> {
    @Query(value = "SELECT * FROM Accounts a WHERE a.user_id = :id",nativeQuery = true)
    Optional<Account> findAccountByUserId(@Param("id") Integer id);

    List<Account> findByLoginAndPassword(String login, String password);

    List<Account> findByLogin(String login);
}
