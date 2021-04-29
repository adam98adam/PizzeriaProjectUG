package com.example.Pizzeria.controller;

import com.example.Pizzeria.models.Account;
import com.example.Pizzeria.models.User;
import com.example.Pizzeria.service.AccountService;
import com.example.Pizzeria.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class AccountController {

    @Autowired
    private AccountService accountService;


    @GetMapping("/login/{login}/{password}")
    public ResponseEntity<Account> getAccouunt(@PathVariable String login,@PathVariable String password) {
        Account acc = accountService.getAccount(login,password);
        if(acc.getLogin() == null)
            return new ResponseEntity<>(acc,HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(acc,HttpStatus.OK);
    }



}
