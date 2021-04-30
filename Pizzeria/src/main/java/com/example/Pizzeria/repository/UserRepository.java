package com.example.Pizzeria.repository;

import com.example.Pizzeria.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {
    List<User> findByEmailOrPhonenumber(String email,String phonenumber);
}
