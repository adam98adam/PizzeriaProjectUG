package com.example.Pizzeria.controller;

import com.example.Pizzeria.models.Drinks;
import com.example.Pizzeria.models.Pizza;
import com.example.Pizzeria.repository.DrinksRepository;
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
public class DrinksController {

    @Autowired
    private DrinksRepository drinksRepository;

    @GetMapping("/drinks")
    public ResponseEntity<List<Drinks>> getAllDrinks() {
        List<Drinks> drinks = drinksRepository.findAll();
        if(drinks.isEmpty())
            return new ResponseEntity<>(drinks, HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(drinks,HttpStatus.OK);
    }
}
