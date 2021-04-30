package com.example.Pizzeria.repository;

import com.example.Pizzeria.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account,Integer> {
    List<Account> findByLoginAndPassword(String login, String password);
    List<Account> findByLogin(String login);
}
