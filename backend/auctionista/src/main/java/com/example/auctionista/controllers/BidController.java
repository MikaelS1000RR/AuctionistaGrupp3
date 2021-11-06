package com.example.auctionista.controllers;

import com.example.auctionista.entities.Bid;
import com.example.auctionista.services.BidService;
import com.example.auctionista.statuses.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/rest/bids")
public class BidController {

  @Autowired
  public BidService bidService;

  @GetMapping
  public List<Bid> getAllBids() {
    return bidService.getAllBids();
  }

  @GetMapping("/{id}")
  public Object getBidById(@PathVariable long id) {
    Optional<Bid> bid = bidService.getById(id);
    if(bid.isEmpty()) {
      System.out.println("No such bid has benn found by bidID: " + bid);
      var error = new NotFoundException();
      return error.bidNotFoundError(id);
    }
    return new ResponseEntity<>(bid, HttpStatus.OK);
  }

  @PostMapping
  public Bid createBid(@RequestBody Bid bid) {
    return bidService.createBid(bid);
  }

  @PutMapping("/{id}")
  public Bid updateBid(@PathVariable long id, @RequestBody Map values) {
    return bidService.updateById(id, values);
  }
}
