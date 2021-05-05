package com.example.Pizzeria.controller;


import com.example.Pizzeria.models.Account;
import com.example.Pizzeria.models.Address;
import com.example.Pizzeria.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class AddressController {

    @Autowired
    private AddressRepository addressRepository;

    @PostMapping("/users/address")
    public ResponseEntity<Address> createAddress(@RequestBody Address newAddress) {
        addressRepository.save(newAddress);
        return new ResponseEntity<>(newAddress, HttpStatus.OK);
    }

}
