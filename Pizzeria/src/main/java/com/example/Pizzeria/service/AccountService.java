package com.example.Pizzeria.service;

import com.example.Pizzeria.models.Account;

import java.util.Optional;

public interface AccountService {
    Account getAccount(String login,String password);

}
