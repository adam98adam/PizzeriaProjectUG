package com.example.Pizzeria.controller;

import com.example.Pizzeria.models.Drinks;
import com.example.Pizzeria.repository.DrinksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("/drinks/{id}")
    public ResponseEntity<Optional<Drinks>> getDrinkById(@PathVariable Integer id) {
        Optional<Drinks> drinks = drinksRepository.findById(id);
        if(drinks.isPresent())
            return new ResponseEntity<>(drinks,HttpStatus.OK);
        else
            return new ResponseEntity<>(drinks,HttpStatus.NOT_FOUND);

    }
    @PostMapping("/drinks")
    public ResponseEntity<Drinks> saveDrink(@Valid @RequestBody Drinks drink) {
        List<Drinks> drinks = drinksRepository.findByName(drink.getName());
        if(drinks.isEmpty()) {
            drinksRepository.save(drink);
            return new ResponseEntity<>(drink,HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new Drinks(),HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/drinks/{id}")
    public ResponseEntity<Drinks> updateDrinkById(@PathVariable Integer id,@Valid @RequestBody Drinks drinks) {
        List<Drinks> dri = drinksRepository.findByName(drinks.getName());
        if (dri.isEmpty()) {
            Optional<Drinks> ac = drinksRepository.findById(id);
            ac.ifPresent(value -> value.setName(drinks.getName()));
            ac.ifPresent(value -> value.setPrice(drinks.getPrice()));
            Drinks updatedDrinks = drinksRepository.save(ac.get());
            return new ResponseEntity<>(updatedDrinks, HttpStatus.OK);
        } else if (dri.get(0).getId().equals(id)) {
            dri.get(0).setName(drinks.getName());
            dri.get(0).setPrice(drinks.getPrice());
            Drinks updatedDrinks = drinksRepository.save(dri.get(0));
            return new ResponseEntity<>(updatedDrinks, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Drinks(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/drinks/{id}")
    private ResponseEntity<String> deleteDrinkById(@PathVariable Integer id) {
        Optional<Drinks> drink = drinksRepository.findById(id);
        if (drink.isPresent()) {
            drinksRepository.deleteById(id);
            return new ResponseEntity<>("Drink with given id = " + id + " was deleted", HttpStatus.OK);

        } else {
            return new ResponseEntity<>("Drink with given id = " + id + " was not found", HttpStatus.NOT_FOUND);
        }
    }
}
