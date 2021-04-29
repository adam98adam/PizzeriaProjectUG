package com.example.Pizzeria.service;

import com.example.Pizzeria.models.Account;
import com.example.Pizzeria.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class AccountServiceImpl implements AccountService{
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Account getAccount(String login,String password) {

          List<Account> accounts = accountRepository.findAll();
          Account acc = new Account();
          //System.out.println(acc);
          //System.out.println(accounts);
          accounts.forEach(account -> {
              if(account.getLogin().equals(login) && account.getPassword().equals(password)) {
                  acc.setId(account.getId());
                  acc.setLogin(login);
                  acc.setPassword(password);
                  acc.setUser(account.getUser());
              }
          });

          return acc;
    }
}
