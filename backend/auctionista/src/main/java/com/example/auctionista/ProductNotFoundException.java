package com.example.auctionista;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.NOT_FOUND, reason="No such Product by id")  // 404
public class ProductNotFoundException extends RuntimeException {
  public  ResponseEntity productNotFoundError(long id) {
    HttpHeaders headers = new HttpHeaders();
    headers.add("Product error by id", "product id");
    System.out.println("headers"+headers);
    return new ResponseEntity<String>("No such product by id : "  + id , headers, HttpStatus.NOT_FOUND);
  }

}