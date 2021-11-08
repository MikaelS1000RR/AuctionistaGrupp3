package com.example.auctionista.controllers;

import com.example.auctionista.entities.User;
import com.example.auctionista.services.UserService;
import com.example.auctionista.statuses.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/rest/users") // prefix
public class UserController {

    @Autowired
    public UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable long id) {
        Optional<User> user = userService.getById(id);
        if(user.isEmpty()) {
           throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<User>(user.get(), HttpStatus.OK);
    }

    @PostMapping
    public User createUser(@RequestBody User user) throws Exception {
        return userService.createUser(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable long id, @RequestBody Map values) {
        System.out.println("Reached here...");
        return userService.updateById(id, values);
    }


}
