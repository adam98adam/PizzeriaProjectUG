package com.example.Pizzeria.controller;

import com.example.Pizzeria.models.*;
import com.example.Pizzeria.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        if (users.isEmpty())
            return new ResponseEntity<>(users, HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent())
            return new ResponseEntity<>(user, HttpStatus.OK);
        else
            return new ResponseEntity<>(user, HttpStatus.NOT_FOUND);
    }


    @PostMapping("/users")
    public ResponseEntity<User> getAccountByEmailAndPhonenumebr(@RequestBody User newUser) {
        List<User> users = userRepository.findByEmailOrPhonenumber(newUser.getEmail(), newUser.getPhonenumber());
        if (users.isEmpty()) {
            userRepository.save(newUser);
            return new ResponseEntity<>(newUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new User(), HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable Integer id, @RequestBody User user) {
        List<User> u = userRepository.findByEmailOrPhonenumber(user.getEmail(), user.getPhonenumber());
        if (u.isEmpty()) {
            Optional<User> us = userRepository.findById(id);
            us.ifPresent(value -> value.setName(user.getName()));
            us.ifPresent(value -> value.setSurname(user.getSurname()));
            us.ifPresent(value -> value.setEmail(user.getEmail()));
            us.ifPresent(value -> value.setPhonenumber(user.getPhonenumber()));
            User updatedUser = userRepository.save(us.get());
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);

        } else if (u.size() == 1) {
            if (u.get(0).getId().equals(id)) {
                u.get(0).setName(user.getName());
                u.get(0).setSurname(user.getSurname());
                u.get(0).setEmail(user.getEmail());
                u.get(0).setPhonenumber(user.getPhonenumber());
                User updatedUser = userRepository.save(u.get(0));
                return new ResponseEntity<>(updatedUser, HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(new User(), HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(new User(), HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/users/{id}")
    private ResponseEntity<String> deleteUserById(@PathVariable Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.deleteById(id);
            return new ResponseEntity<>("User with given id = " + id + " was deleted", HttpStatus.OK);

        } else {
            return new ResponseEntity<>("User with given id = " + id + " was not found", HttpStatus.NOT_FOUND);
        }
    }


}