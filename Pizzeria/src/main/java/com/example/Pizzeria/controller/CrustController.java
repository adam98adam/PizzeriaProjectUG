package com.example.Pizzeria.controller;

import com.example.Pizzeria.models.Address;
import com.example.Pizzeria.models.Bakestyle;
import com.example.Pizzeria.models.Crust;
import com.example.Pizzeria.models.User;
import com.example.Pizzeria.repository.CrustRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class CrustController {

    @Autowired
    private CrustRepository crustRepository;

    @GetMapping("/crusts")
    public ResponseEntity<List<Crust>> getAllCrusts() {
        List<Crust> crusts = crustRepository.findAll();
        if (crusts.isEmpty())
            return new ResponseEntity<>(crusts, HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(crusts, HttpStatus.OK);
    }

    @GetMapping("/crusts/{id}")
    public ResponseEntity<Optional<Crust>> getCrustById(@PathVariable Integer id) {
        Optional<Crust> crust = crustRepository.findById(id);
        if (crust.isPresent())
            return new ResponseEntity<>(crust, HttpStatus.OK);
        else
            return new ResponseEntity<>(crust, HttpStatus.NOT_FOUND);

    }

    @PutMapping("/crusts/{id}")
    public ResponseEntity<Crust> updateCrustById(@PathVariable Integer id, @RequestBody Crust crust) {
        List<Crust> u = crustRepository.findByCrustOrPrice(crust.getCrust(), crust.getPrice());
        if (u.isEmpty()) {
            Optional<Crust> us = crustRepository.findById(id);
            us.ifPresent(value -> value.setCrust(crust.getCrust()));
            System.out.println("Crust : " + crust.getCrust());
            us.ifPresent(value -> value.setPrice(crust.getPrice()));
            System.out.println("Price : " + crust.getPrice());
            Crust updatedCrust = crustRepository.save(us.get());
            return new ResponseEntity<>(updatedCrust, HttpStatus.OK);

        } else if (u.size() == 1) {
            if (u.get(0).getId().equals(id)) {
                u.get(0).setCrust(crust.getCrust());
                System.out.println("Crust : " + crust.getCrust());
                u.get(0).setPrice(crust.getPrice());
                System.out.println("Price : " + crust.getPrice());
                Crust updatedCrust = crustRepository.save(u.get(0));
                return new ResponseEntity<>(updatedCrust, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new Crust(), HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(new Crust(), HttpStatus.NOT_FOUND);
        }

    }
}


