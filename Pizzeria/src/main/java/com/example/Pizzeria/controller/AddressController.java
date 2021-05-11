package com.example.Pizzeria.controller;


import com.example.Pizzeria.models.Account;
import com.example.Pizzeria.models.Address;
import com.example.Pizzeria.models.User;
import com.example.Pizzeria.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

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


    @GetMapping("/users/address/idAddress/{id}")
    public ResponseEntity<Optional<Address>> getAddressById(@PathVariable Integer id) {
        Optional<Address> address = addressRepository.findById(id);
        if(address.isPresent())
            return new ResponseEntity<>(address,HttpStatus.OK);
        else
            return new ResponseEntity<>(address,HttpStatus.NOT_FOUND);

    }

    @GetMapping("/users/address/{id}")
    public ResponseEntity<Optional<Address>> getAddressByUserId(@PathVariable Integer id) {
        //Optional<Address> address = addressRepository.findAddressByUserId(id);
        Optional<Address> address = addressRepository.findByUser_Id(id);
        if(address.isPresent())
            return new ResponseEntity<>(address,HttpStatus.OK);
        else
            return new ResponseEntity<>(address,HttpStatus.NOT_FOUND);

    }

    @PutMapping("users/address/{id}")
    public ResponseEntity<Address> updateAddress(@PathVariable Integer id, @RequestBody Address address) {
        Optional<Address> a = addressRepository.findById(id);
        if(a.isPresent()) {
            a.get().setCity(address.getCity());
            a.get().setStreet(address.getStreet());
            a.get().setNumber(address.getNumber());
            addressRepository.save(a.get());
            return new ResponseEntity<>(a.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Address(),HttpStatus.NOT_FOUND);
    }

}
