package com.example.auctionista.statuses;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ResponseStatus;

// @ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "No such user has been found by id")
public class NotFoundException extends RuntimeException {

    public ResponseEntity<?> userNotFoundError(long id) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("User Error by id", "userID");
        System.out.println("headers " + headers);
        return new ResponseEntity<String>("No such user has been found by id: " + id, headers, HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<?> productNotFoundError(long id) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Product Error by id", "productID");
        System.out.println("headers " + headers);
        return new ResponseEntity<String>("No such product has been found by id: " + id, headers, HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<?> locationNotFoundError(long id) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location Error by id", "locationID");
        System.out.println("headers " + headers);
        return new ResponseEntity<String>("No such location has been found by id: " + id, headers, HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<?> categoryNotFoundError(long id) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Category Error by id", "categoryID");
        System.out.println("headers " + headers);
        return new ResponseEntity<String>("No such category has been found by id: " + id, headers, HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<?> bidNotFoundError(long id) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Bid Error by id", "bidID");
        System.out.println("headers" + headers);
        return new ResponseEntity<String>("No such bud has been found by id: " + id, headers, HttpStatus.NOT_FOUND);
    }


}
