package com.example.auctionista.controllers;

import com.example.auctionista.entities.Bid;
import com.example.auctionista.services.BidService;
import org.springframework.beans.factory.annotation.Autowired;
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

  @GetMapping("/productId/{id}")
  public List<Bid> getMapping(@PathVariable long id) {
    return bidService.getByProductId(id);
  }
  @GetMapping("/{id}")
  public Optional<Bid> getBidById(@PathVariable long id) {
    return bidService.getById(id);
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
