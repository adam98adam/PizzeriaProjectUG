package com.example.Pizzeria.repository;

import com.example.Pizzeria.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {
}
