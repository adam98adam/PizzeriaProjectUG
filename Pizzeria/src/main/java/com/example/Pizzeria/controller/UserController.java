package com.example.Pizzeria.controller;

import com.example.Pizzeria.models.Account;
import com.example.Pizzeria.models.Address;
import com.example.Pizzeria.models.Orders;
import com.example.Pizzeria.models.User;
import com.example.Pizzeria.repository.AccountRepository;
import com.example.Pizzeria.repository.AddressRepository;
import com.example.Pizzeria.repository.OrdersRepository;
import com.example.Pizzeria.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.jws.soap.SOAPBinding;
import javax.persistence.criteria.CriteriaBuilder;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class UserController {


    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AddressRepository addressRepository;


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrdersRepository ordersRepository;


    @PostMapping("/users")
    public ResponseEntity<User> getAccountByEmailAndPhonenumebr(@RequestBody User newUser) {
        List<User> users = userRepository.findByEmailOrPhonenumber(newUser.getEmail(), newUser.getPhonenumber());
        if (users.isEmpty()) {
            userRepository.save(newUser);
            return new ResponseEntity<>(newUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new User(), HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id) {
        //Optional<Account> account = accountRepository.findAccountByUserId(id);
        Optional<Account> account = accountRepository.findByUser_Id(id);
        //Optional<Address> address = addressRepository.findAddressByUserId(id);
        Optional<Address> address = addressRepository.findByUser_Id(id);
        Optional<List<Orders>> orders = ordersRepository.findByUser_Id(id);
        Optional<User> user = userRepository.findById(id);
        if(account.isPresent() && address.isPresent() && user.isPresent()) {
            accountRepository.delete(account.get());
            addressRepository.delete(address.get());
            orders.ifPresent(ordersList -> ordersList.forEach(order -> ordersRepository.deleteById(order.getId())));
            userRepository.deleteById(id);
            return new ResponseEntity<>("User with given id = " + id + " was deleted", HttpStatus.OK);
        }
        return new ResponseEntity<>("User with given id = " + id + " doesn't exist", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User user) {
        List<User> u = userRepository.findByEmailOrPhonenumber(user.getEmail(), user.getPhonenumber());
        if (u.isEmpty()) {
            Optional<User> us = userRepository.findById(id);
            us.ifPresent(value -> value.setName(user.getName()));
            System.out.println("Name : " + user.getName());
            us.ifPresent(value -> value.setSurname(user.getSurname()));
            System.out.println("Surname : " + user.getSurname());
            us.ifPresent(value -> value.setEmail(user.getEmail()));
            System.out.println("Email : " + user.getEmail());
            us.ifPresent(value -> value.setPhonenumber(user.getPhonenumber()));
            System.out.println("Phonenumber : " + user.getPhonenumber());
            User updatedUser = userRepository.save(us.get());
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);

        } else if (u.size() == 1) {
            if (u.get(0).getId().equals(id)) {
                u.get(0).setName(user.getName());
                System.out.println("Name : " + user.getName());
                u.get(0).setSurname(user.getSurname());
                System.out.println("Surname : " + user.getSurname());
                u.get(0).setEmail(user.getEmail());
                System.out.println("Email : " + user.getEmail());
                u.get(0).setPhonenumber(user.getPhonenumber());
                System.out.println("Phonenumber : " + user.getPhonenumber());
                User updatedUser = userRepository.save(u.get(0));
                return new ResponseEntity<>(updatedUser, HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(new User(), HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(new User(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent())
            return new ResponseEntity<>(user, HttpStatus.OK);
        else
            return new ResponseEntity<>(user, HttpStatus.NOT_FOUND);
    }




    /*

    @PostMapping("/users")
    public User createUser(@RequestBody User user){
        System.out.println(user);
        return userService.saveUser(user);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        try {
            User user = userService.getUserById(id);
            System.out.println(user);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User userDetails) {
        User user = userService.getUserById(id);
        user.setName(userDetails.getName());
        user.setSurname(userDetails.getSurname());
        user.setEmail(userDetails.getEmail());
        user.setPhonenumber(userDetails.getPhonenumber());

        User updatedUser = userService.saveUser(user);
        return ResponseEntity.ok(updatedUser);

    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteUser(@PathVariable Integer id) {
        User user = userService.getUserById(id);
        userService.deleteUser(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("delete",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    /*
    @GetMapping("/")
    public String viewHomePage(Model model) {
        model.addAttribute("listUsers", userService.getAllUsers());
        return "index";
    }

    @GetMapping("/showNewUserForm")
    public String showNewUserForm(Model model) {
        User user = new User();
        model.addAttribute("user", user);
        return "new_user";
    }

    @PostMapping("/saveUser")
    public String saveUser(@ModelAttribute("user") User user) {
        user.setCustomer(true);
        userService.saveUser(user);
        return "redirect:/";
    }

    @GetMapping("/showFormForUpdate/{id}")
    public String showFormForUpdate(@PathVariable(value = "id") Integer id, Model model) {
        User user = userService.getUserById(id);
        model.addAttribute("user", user);
        return "update_user";
    }


    @GetMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable(value = "id") Integer id) {
        this.userService.deleteUserById(id);
        return "redirect:/";
    }

     */
}