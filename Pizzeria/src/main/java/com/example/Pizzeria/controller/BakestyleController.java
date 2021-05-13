package com.example.Pizzeria.controller;


import com.example.Pizzeria.models.Account;
import com.example.Pizzeria.models.Address;
import com.example.Pizzeria.models.Bakestyle;
import com.example.Pizzeria.models.Pizza;
import com.example.Pizzeria.repository.BakestyleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class BakestyleController {

    @Autowired
    private BakestyleRepository bakestyleRepository;

    @GetMapping("/bakestyle")
    public ResponseEntity<List<Bakestyle>> getAllBakestyle() {
        List<Bakestyle> bakestyles = bakestyleRepository.findAll();
        if (bakestyles.isEmpty())
            return new ResponseEntity<>(bakestyles, HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(bakestyles, HttpStatus.OK);
    }

    @GetMapping("/bakestyle/{id}")
    public ResponseEntity<Optional<Bakestyle>> getBakestyleById(@PathVariable Integer id) {
        Optional<Bakestyle> bakestyle = bakestyleRepository.findById(id);
        if (bakestyle.isPresent())
            return new ResponseEntity<>(bakestyle, HttpStatus.OK);
        else
            return new ResponseEntity<>(bakestyle, HttpStatus.NOT_FOUND);

    }

    @PutMapping("/bakestyle/{id}")
    public ResponseEntity<Bakestyle> updateBakestyleById(@PathVariable Integer id, @RequestBody Bakestyle bakestyle) {
        List<Bakestyle> bak = bakestyleRepository.findByName(bakestyle.getName());
        if (bak.isEmpty()) {
            Optional<Bakestyle> ac = bakestyleRepository.findById(id);
            ac.ifPresent(value -> value.setName(bakestyle.getName()));
            Bakestyle updatedBakestyle = bakestyleRepository.save(ac.get());
            return new ResponseEntity<>(updatedBakestyle, HttpStatus.OK);
        } else if (bak.get(0).getId().equals(id)) {
            bak.get(0).setName(bakestyle.getName());
            Bakestyle updatedBakestyle = bakestyleRepository.save(bak.get(0));
            return new ResponseEntity<>(updatedBakestyle, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Bakestyle(), HttpStatus.NOT_FOUND);
        }
    }
}
