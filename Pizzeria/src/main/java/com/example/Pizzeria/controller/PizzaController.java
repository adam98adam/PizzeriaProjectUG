package com.example.Pizzeria.controller;

import com.example.Pizzeria.models.Bakestyle;
import com.example.Pizzeria.models.Pizza;
import com.example.Pizzeria.models.User;
import com.example.Pizzeria.repository.PizzaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/pizza/{id}")
    public ResponseEntity<Optional<Pizza>> getPizzaById(@PathVariable Integer id) {
        Optional<Pizza> pizza = pizzaRepository.findById(id);
        if(pizza.isPresent())
            return new ResponseEntity<>(pizza,HttpStatus.OK);
        else
            return new ResponseEntity<>(pizza,HttpStatus.NOT_FOUND);

    }

    @PutMapping("/pizza/{id}")
    public ResponseEntity<Pizza> updatePizzaById(@PathVariable Integer id, @RequestBody Pizza pizza) {
        List<Pizza> u = pizzaRepository.findByNameOrDescriptionOrImage(pizza.getName(), pizza.getDescription(),pizza.getImage());
        if (u.isEmpty()) {
            Optional<Pizza> us = pizzaRepository.findById(id);
            us.ifPresent(value -> value.setName(pizza.getName()));
            System.out.println("Name : " + pizza.getName());
            us.ifPresent(value -> value.setDescription(pizza.getDescription()));
            System.out.println("Description: " + pizza.getDescription());
            us.ifPresent(value -> value.setPrice(pizza.getPrice()));
            System.out.println("Price : " + pizza.getPrice());
            us.ifPresent(value -> value.setImage(pizza.getImage()));
            System.out.println("Image : " + pizza.getImage());
            Pizza updatedPizza = pizzaRepository.save(us.get());
            return new ResponseEntity<>(updatedPizza, HttpStatus.OK);

        } else if (u.size() == 1) {
            if (u.get(0).getId().equals(id)) {
                u.get(0).setName(pizza.getName());
                System.out.println("Name : " + pizza.getName());
                u.get(0).setDescription(pizza.getDescription());
                System.out.println("Description : " + pizza.getDescription());
                u.get(0).setPrice(pizza.getPrice());
                System.out.println("Price : " + pizza.getPrice());
                u.get(0).setImage(pizza.getImage());
                System.out.println("Image : " + pizza.getImage());
                Pizza updatedPizza = pizzaRepository.save(u.get(0));
                return new ResponseEntity<>(updatedPizza, HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(new Pizza(), HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(new Pizza(), HttpStatus.NOT_FOUND);
        }
    }

}
