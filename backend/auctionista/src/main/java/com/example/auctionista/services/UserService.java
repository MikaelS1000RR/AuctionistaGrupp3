package com.example.auctionista.services;

import com.example.auctionista.configs.MyUserDetailsService;
import com.example.auctionista.entities.User;
import com.example.auctionista.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.example.auctionista.Utilities;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.springframework.security.web.context.HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    // bean from your SecurityConfig
    @Resource(name = "authenticationManager")
    private AuthenticationManager authManager;

    public User findCurrentUser() {
        // the login session is stored between page reloads,
        // and we can access the current authenticated user with this
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getById(long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        // user userDetailsService to save new user
        // because we encrypt the password here
        if (userRepository.findByUsername(user.getUsername()) == null) {
            return myUserDetailsService.addUser(user);
        }
        return null;
    }



    public User login(User user, HttpServletRequest req) {
        try {
            // Let Spring Security handle authentication of credentials
            UsernamePasswordAuthenticationToken authReq
                    = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
            Authentication auth = authManager.authenticate(authReq);

            // Add logged in user to sessions
            SecurityContext sc = SecurityContextHolder.getContext();
            sc.setAuthentication(auth);

            // Set cookie to remember logged in user
            HttpSession session = req.getSession(true);
            session.setAttribute(SPRING_SECURITY_CONTEXT_KEY, sc);

        } catch(BadCredentialsException err) {
            // throw error on bad credentials
            throw new BadCredentialsException("Bad Credentials");
        }

        return findCurrentUser();
    }

    public User updateById(long id, Map value) {
        Optional<User> userOptional = getById(id);

        if(userOptional.isPresent()) {
            var user = userOptional.get();
            // update only the values in the kitten object
            // that matches the values from the hashMap

            // helper method to set private variables in an object

            Utilities.updatePrivateFields(user, value);

            // Encrypts password when update
            if(value.containsKey("password")) {
                user.setPassword(myUserDetailsService.getEncoder().encode(user.getPassword()));
            }
            return userRepository.save(user);
        }

        return null;
    }

}
