package com.example.auctionista.controllers;

import com.example.auctionista.entities.User;
import com.example.auctionista.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public User login(@RequestBody User user, HttpServletRequest req) {
        return userService.login(user, req);
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) throws Exception {
        return userService.createUser(user);
    }

    @GetMapping("/whoami")
    public User whoAmI(Model model, String error, String logout) {

        if (error != null)
            model.addAttribute("error", "Your username and password is invalid.");

        if (logout != null)
            model.addAttribute("message", "You have been logged out successfully.");

        return userService.findCurrentUser();
    }
}