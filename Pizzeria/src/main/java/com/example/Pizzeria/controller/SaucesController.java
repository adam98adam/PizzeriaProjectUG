package com.example.Pizzeria.controller;


import com.example.Pizzeria.models.Bakestyle;
import com.example.Pizzeria.models.Pizzasize;
import com.example.Pizzeria.models.Sauces;
import com.example.Pizzeria.repository.SaucesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class SaucesController {

    @Autowired
    private SaucesRepository saucesRepository;

    @GetMapping("/sauces")
    public ResponseEntity<List<Sauces>> getAllSauces() {
        List<Sauces> sauces = saucesRepository.findAll();
        if (sauces.isEmpty())
            return new ResponseEntity<>(sauces, HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(sauces, HttpStatus.OK);
    }

    @GetMapping("/sauces/{id}")
    public ResponseEntity<Optional<Sauces>> getSauceById(@PathVariable Integer id) {
        Optional<Sauces> sauces = saucesRepository.findById(id);
        if (sauces.isPresent())
            return new ResponseEntity<>(sauces, HttpStatus.OK);
        else
            return new ResponseEntity<>(sauces, HttpStatus.NOT_FOUND);

    }
    @PostMapping("/sauces")
    public ResponseEntity<Sauces> saveSauce(@RequestBody Sauces sauce) {
        List<Sauces> sauces =  saucesRepository.findByName(sauce.getName());
        if(sauces.isEmpty()) {
            saucesRepository.save(sauce);
            return new ResponseEntity<>(sauce,HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new Sauces(),HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/sauces/{id}")
    public ResponseEntity<Sauces> updateSauceById(@PathVariable Integer id, @RequestBody Sauces sauces) {
        List<Sauces> sau = saucesRepository.findByName(sauces.getName());
        if (sau.isEmpty()) {
            Optional<Sauces> ac = saucesRepository.findById(id);
            ac.ifPresent(value -> value.setName(sauces.getName()));
            ac.ifPresent(value -> value.setPrice(sauces.getPrice()));
            Sauces updatedSauce = saucesRepository.save(ac.get());
            return new ResponseEntity<>(updatedSauce, HttpStatus.OK);
        } else if (sau.get(0).getId().equals(id)) {
            sau.get(0).setName(sauces.getName());
            sau.get(0).setPrice(sauces.getPrice());
            Sauces updatedSauce = saucesRepository.save(sau.get(0));
            return new ResponseEntity<>(updatedSauce, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Sauces(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/sauces/{id}")
    public ResponseEntity<String> deleteSauceById(@PathVariable Integer id) {
        Optional<Sauces> sauce = saucesRepository.findById(id);
        if(sauce.isPresent()) {
            saucesRepository.deleteById(id);
            return new ResponseEntity<>("Sauce with given id = " + id + " was deleted", HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Sauce with given id = " + id + " was not found",HttpStatus.NOT_FOUND);
    }


}
