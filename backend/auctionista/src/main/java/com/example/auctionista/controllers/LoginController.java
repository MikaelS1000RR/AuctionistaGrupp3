package com.example.auctionista.controllers;

import com.example.auctionista.entities.User;
import com.example.auctionista.services.UserService;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

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
    public User whoAmI() {

        return userService.findCurrentUser();
    }

    // Google Authentication
    @RequestMapping(value = "/storeauthcode",  method = RequestMethod.GET)
    public String storeauthcode(@RequestBody String code, @RequestHeader("X-Requested-With") String encoding) {
        if (encoding == null || encoding.isEmpty()) {
            // Without the `X-Requested-With` header, this request could be forged. Aborts.
            return "Error, wrong headers";
        }

        GoogleTokenResponse tokenResponse = null;
        try {
            tokenResponse = new GoogleAuthorizationCodeTokenRequest(
                    new NetHttpTransport(),
                    JacksonFactory.getDefaultInstance(),
                    "https://www.googleapis.com/oauth2/v4/token",
                    "90167992744-ke5qisilesjagf66v907i2te58gjaufg.apps.googleusercontent.com",
                    "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",
                    code,
                    "http://localhost:4000") // Make sure you set the correct port
                    .execute();
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Store these 3 in your DB
        String accessToken = tokenResponse.getAccessToken();
        String refreshToken = tokenResponse.getRefreshToken();
        Long expiresAt = System.currentTimeMillis() + (tokenResponse.getExpiresInSeconds() * 1000);

        // Debug purpose only
        System.out.println("accessToken: " + accessToken);
        System.out.println("refreshToken: " + refreshToken);
        System.out.println("expiresAt: " + expiresAt);

        return "OK";


    }


}
