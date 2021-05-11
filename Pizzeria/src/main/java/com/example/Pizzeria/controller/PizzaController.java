package com.example.Pizzeria.controller;

import com.example.Pizzeria.models.Pizza;
import com.example.Pizzeria.repository.PizzaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class PizzaController {

    @Autowired
    private PizzaRepository pizzaRepository;

    @GetMapping("/pizza")
    public ResponseEntity<List<Pizza>> getAllPizza() {
        List<Pizza> pizza = pizzaRepository.findAll();
        if(pizza.isEmpty())
            return new ResponseEntity<>(pizza, HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(pizza,HttpStatus.OK);
    }

}
