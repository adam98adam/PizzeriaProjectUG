package com.example.Pizzeria.controller;

import com.example.Pizzeria.models.Orders;
import com.example.Pizzeria.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class OrdersController {

    @Autowired
    private OrdersRepository ordersRepository;

    @GetMapping("/user/orders")
    public ResponseEntity<List<Orders>> getAllOrders() {
        List<Orders> orders = ordersRepository.findAll();
        if(orders.isEmpty())
            return new ResponseEntity<>(orders, HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(orders,HttpStatus.OK);
    }

    @GetMapping("/user/{id}/orders")
    private ResponseEntity<Optional<List<Orders>>> getOrdersByUserId(@PathVariable Integer id) {
        Optional<List<Orders>> orders = ordersRepository.findByUser_Id(id);
        if(orders.isPresent())
            return new ResponseEntity<>(orders, HttpStatus.OK);
        else
            return new ResponseEntity<>(orders, HttpStatus.BAD_REQUEST);
    }


    @PostMapping("/user/{id}/orders")
        private ResponseEntity<Orders> OrderByUser(@PathVariable Integer id, @RequestBody Orders orders) {
            ordersRepository.save(orders);
            return new ResponseEntity<>(orders,HttpStatus.OK);
    }
}
