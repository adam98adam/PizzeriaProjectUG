package com.example.Pizzeria.controller;


import com.example.Pizzeria.models.*;
import com.example.Pizzeria.repository.CutstyleRepository;
import com.example.Pizzeria.repository.PizzasizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class PizzasizeController {

    @Autowired
    private PizzasizeRepository pizzasizeRepository;


    @GetMapping("/pizzasize")
    public ResponseEntity<List<Pizzasize>> getAllPizzasize() {
        List<Pizzasize> pizzasizes = pizzasizeRepository.findAll();
        if (pizzasizes.isEmpty())
            return new ResponseEntity<>(pizzasizes, HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(pizzasizes, HttpStatus.OK);
    }

    @GetMapping("/pizzasize/{id}")
    public ResponseEntity<Optional<Pizzasize>> getPizzasizeById(@PathVariable Integer id) {
        Optional<Pizzasize> pizzasize = pizzasizeRepository.findById(id);
        if (pizzasize.isPresent())
            return new ResponseEntity<>(pizzasize, HttpStatus.OK);
        else
            return new ResponseEntity<>(pizzasize, HttpStatus.NOT_FOUND);

    }
    @PostMapping("/pizzasize")
    public ResponseEntity<Pizzasize> savePizzasize(@RequestBody Pizzasize pizzasize) {
        List<Pizzasize> pizzasizes =  pizzasizeRepository.findByNameOrDiameterOrPizzacostfactor(pizzasize.getName(),pizzasize.getDiameter(),pizzasize.getPizzacostfactor());
        if(pizzasizes.isEmpty()) {
            pizzasizeRepository.save(pizzasize);
            return new ResponseEntity<>(pizzasize,HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new Pizzasize(),HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/pizzasize/{id}")
    public ResponseEntity<Pizzasize> updatePizzasizeById(@PathVariable Integer id, @RequestBody Pizzasize pizzasize) {
        List<Pizzasize> u = pizzasizeRepository.findByNameOrDiameterOrPizzacostfactor(pizzasize.getName(), pizzasize.getDiameter(),pizzasize.getPizzacostfactor());
        if (u.isEmpty()) {
            Optional<Pizzasize> us = pizzasizeRepository.findById(id);
            us.ifPresent(value -> value.setName(pizzasize.getName()));
            System.out.println("Name : " + pizzasize.getName());
            us.ifPresent(value -> value.setDiameter(pizzasize.getDiameter()));
            System.out.println("Diameter : " + pizzasize.getDiameter());
            us.ifPresent(value -> value.setPizzacostfactor(pizzasize.getPizzacostfactor()));
            System.out.println("Pizzacostfactor : " + pizzasize.getPizzacostfactor());
            Pizzasize updatedPizzasize = pizzasizeRepository.save(us.get());
            return new ResponseEntity<>(updatedPizzasize, HttpStatus.OK);

        } else if (u.size() == 1) {
            if (u.get(0).getId().equals(id)) {
                u.get(0).setName(pizzasize.getName());
                System.out.println("Name : " + pizzasize.getName());
                u.get(0).setDiameter(pizzasize.getDiameter());
                System.out.println("Diameter : " + pizzasize.getDiameter());
                u.get(0).setPizzacostfactor(pizzasize.getPizzacostfactor());
                System.out.println("Pizzacostfactor : " + pizzasize.getPizzacostfactor());
                Pizzasize updatedPizzasize = pizzasizeRepository.save(u.get(0));
                return new ResponseEntity<>(updatedPizzasize, HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(new Pizzasize(), HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(new Pizzasize(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/pizzasize/{id}")
    private ResponseEntity<String> deletePizzasizeById(@PathVariable Integer id) {
        Optional<Pizzasize> pizzasize = pizzasizeRepository.findById(id);
        if (pizzasize.isPresent()) {
            pizzasizeRepository.deleteById(id);
            return new ResponseEntity<>("Pizzasize with given id = " + id + " was deleted", HttpStatus.OK);

        } else {
            return new ResponseEntity<>("Pizzasize with given id = " + id + " was not found", HttpStatus.NOT_FOUND);
        }
    }

}
