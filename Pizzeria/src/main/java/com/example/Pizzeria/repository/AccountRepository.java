package com.example.Pizzeria.repository;

import com.example.Pizzeria.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account,Integer> {
}
