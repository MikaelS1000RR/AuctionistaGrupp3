package com.example.auctionista.controllers;

import com.example.auctionista.entities.Bid;
import com.example.auctionista.entities.Product;
import com.example.auctionista.services.BidService;
import com.example.auctionista.services.ProductService;
import com.example.auctionista.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/rest/bids")
public class BidController {

  @Autowired
  public BidService bidService;
  @Autowired
  public ProductService productService;
  @Autowired
  public UserService userService;

  @GetMapping
  public ResponseEntity<List<Bid>> getAllBids() {
    List<Bid> bids = bidService.getAllBids();
    if (bids.isEmpty()) {
      System.out.println("Bids no found");
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<List<Bid>>(bids,HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public  ResponseEntity<Bid> getBidById(@PathVariable long id) {
    Optional<Bid> bid = bidService.getById(id);
    if(bid.isEmpty()) {
      System.out.println("No such bid has been found by bidID: " + id);
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<Bid>(bid.get(), HttpStatus.OK);
  }

  @PostMapping
  public Bid createBid(@RequestBody Bid bid) {
    var bidderId = bid.getBidderId().getId();
    var user = userService.getById(bidderId);
    if (user.isEmpty()){
      System.out.println("The bidderId doesn't exist in User Entity");
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    var productId = bid.getProductId().getId();
    var product = productService.getById(productId);
    if (product.isEmpty()){
      System.out.println("The productId doesn't exist in Product Entity");
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    var  currentUser = userService.findCurrentUser();
    System.out.println(currentUser + "currentUser");
    if (currentUser == null){
      System.out.println("You must login in first to save bid");
      throw new ResponseStatusException(HttpStatus.FORBIDDEN);
    }
    return bidService.createBid(bid);
  }

  @PutMapping("/{id}")
  public Bid updateBid(@PathVariable long id, @RequestBody Map values) {
    return bidService.updateById(id, values);
  }
}
