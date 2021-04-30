package com.example.Pizzeria.controller;

import com.example.Pizzeria.models.Account;
import com.example.Pizzeria.models.User;
import com.example.Pizzeria.repository.AccountRepository;
import com.example.Pizzeria.repository.UserRepository;
import com.example.Pizzeria.service.UserService;
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
    private UserService userService;

    @Autowired
    private UserRepository userRepository;


    @PostMapping("/users")
    public ResponseEntity<User> getAccountByEmailAndPhonenumebr(@RequestBody User newUser) {
        List<User> users = userRepository.findByEmailOrPhonenumber(newUser.getEmail(),newUser.getPhonenumber());
        if(users.isEmpty()) {
            userRepository.save(newUser);
            return new ResponseEntity<>(newUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new User(),HttpStatus.NOT_FOUND);
        }
    }




    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()) {
            userRepository.deleteById(id);
            return new ResponseEntity<>("User with given id = " + id + " was deleted", HttpStatus.OK);
        }
        return new ResponseEntity<>("User with given id = " + id + " doesn't exist",HttpStatus.NOT_FOUND);

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