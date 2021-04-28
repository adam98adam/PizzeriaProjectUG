package com.example.Pizzeria.service;

import com.example.Pizzeria.models.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User saveUser(User user);
    User getUserById(Integer id);
    void deleteUser(User user);
}
