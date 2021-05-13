package com.example.Pizzeria.controller;


import com.example.Pizzeria.models.Bakestyle;
import com.example.Pizzeria.models.Crust;
import com.example.Pizzeria.models.Cutstyle;
import com.example.Pizzeria.models.Pizzasize;
import com.example.Pizzeria.repository.CutstyleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class CutstyleController {

    @Autowired
    private CutstyleRepository cutstyleRepository;

    @GetMapping("/cutstyle")
    public ResponseEntity<List<Cutstyle>> getAllCutstyle() {
        List<Cutstyle> cutstyles = cutstyleRepository.findAll();
        if(cutstyles.isEmpty())
            return new ResponseEntity<>(cutstyles, HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(cutstyles,HttpStatus.OK);
    }

    @GetMapping("/cutstyle/{id}")
    public ResponseEntity<Optional<Cutstyle>> getCutstyleById(@PathVariable Integer id) {
        Optional<Cutstyle> cutstyle = cutstyleRepository.findById(id);
        if(cutstyle.isPresent())
            return new ResponseEntity<>(cutstyle,HttpStatus.OK);
        else
            return new ResponseEntity<>(cutstyle,HttpStatus.NOT_FOUND);

    }

    @PutMapping("/cutstyle/{id}")
    public ResponseEntity<Cutstyle> updateCutstyleById(@PathVariable Integer id, @RequestBody Cutstyle cutstyle) {
        List<Cutstyle> cut = cutstyleRepository.findByName(cutstyle.getName());
        if (cut.isEmpty()) {
            Optional<Cutstyle> ac = cutstyleRepository.findById(id);
            ac.ifPresent(value -> value.setName(cutstyle.getName()));
            Cutstyle updatedCutstyle = cutstyleRepository.save(ac.get());
            return new ResponseEntity<>(updatedCutstyle, HttpStatus.OK);
        } else if (cut.get(0).getId().equals(id)) {
            cut.get(0).setName(cutstyle.getName());
            Cutstyle updatedCutstyle = cutstyleRepository.save(cut.get(0));
            return new ResponseEntity<>(updatedCutstyle, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Cutstyle(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/cutstyle/{id}")
    private ResponseEntity<String> deleteCutstyleById(@PathVariable Integer id) {
        Optional<Cutstyle> cutstyle = cutstyleRepository.findById(id);
        if (cutstyle.isPresent()) {
            cutstyleRepository.deleteById(id);
            return new ResponseEntity<>("Cutstyle with given id = " + id + " was deleted", HttpStatus.OK);

        } else {
            return new ResponseEntity<>("Cutstyle with given id = " + id + " was not found", HttpStatus.NOT_FOUND);
        }
    }


}
