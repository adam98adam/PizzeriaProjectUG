package com.example.Pizzeria.service;

import com.example.Pizzeria.models.User;
import com.example.Pizzeria.repository.AccountRepository;
import com.example.Pizzeria.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;


    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
