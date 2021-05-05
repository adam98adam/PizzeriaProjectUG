package com.example.Pizzeria.controller;

import com.example.Pizzeria.models.Account;
import com.example.Pizzeria.models.User;
import com.example.Pizzeria.repository.AccountRepository;
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

    @Autowired
    private AccountRepository accountRepository;


    @GetMapping("/accounts/{login}/{password}")
    public ResponseEntity<Account> getAccount(@PathVariable String login,@PathVariable String password) {
        List<Account> accounts  = accountRepository.findByLoginAndPassword(login,password);
        if(accounts.isEmpty())
            return new ResponseEntity<>(new Account(),HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(accounts.get(0),HttpStatus.OK);

    }


    @PostMapping("/accounts")
    public ResponseEntity<Account> getAccountByLogin(@RequestBody Account newAccount) {
            List<Account> accounts = accountRepository.findByLogin(newAccount.getLogin());
            //System.out.println(newAccount.getUser());
            if(accounts.isEmpty()) {
                accountRepository.save(newAccount);
                accounts = accountRepository.findByLogin(newAccount.getLogin());
                return new ResponseEntity<>(accounts.get(0),HttpStatus.OK);
            }else {
                return new ResponseEntity<>(new Account(), HttpStatus.NOT_FOUND);
            }
    }

    @GetMapping("/accounts")
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @GetMapping("/accounts/{id}")
    public  ResponseEntity<Optional<Account>> getAccount(@PathVariable Integer id) {
        Optional<Account> acc = accountRepository.findById(id);
        return new ResponseEntity<>(acc,HttpStatus.OK);
    }



}
