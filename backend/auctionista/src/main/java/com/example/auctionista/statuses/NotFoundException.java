package com.example.auctionista.statuses;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ResponseStatus;

// @ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "No such user has been found by id")
public class NotFoundException extends RuntimeException {

    public ResponseEntity<?> userNotFoundError(long id) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("User Error by id", "userId");
        System.out.println("headers " + headers);
        return new ResponseEntity<String>("No such user has been found by id: " + id, headers, HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<?> productNotFoundError(long id) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Product Error by id", "userId");
        System.out.println("headers " + headers);
        return new ResponseEntity<String>("No such product has been found by id: " + id, headers, HttpStatus.NOT_FOUND);
    }


}
