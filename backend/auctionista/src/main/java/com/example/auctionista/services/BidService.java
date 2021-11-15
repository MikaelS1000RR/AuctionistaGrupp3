package com.example.auctionista.services;

import com.example.auctionista.Utilities;
import com.example.auctionista.entities.Bid;
import com.example.auctionista.repositories.BidRepository;
import com.example.auctionista.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BidService {

  @Autowired
  private BidRepository bidRepository;

  @Autowired
  private ProductRepository productRepository;

  public List<Bid> getAllBids() {
    return bidRepository.findAll();
  }

  public Optional<Bid> getById(long id) {
    return bidRepository.findById(id);
  }

  public Bid createBid(Bid bid) {
    System.out.println(bid);
    var productId = bid.getProductId().getId();
    var productPrice = (int)bid.getPrice();
    bid.setPrice(productPrice);
    var bidder = bid.getBidderId().getId();
    var bidsByProductId = bidRepository.queryGetByProductId(productId);
    System.out.println(bidsByProductId + " bidsByProductId");


    var ownerOfProductByProductId = productRepository.queryGetOwnerOfProductByProductId(productId);
    System.out.println(ownerOfProductByProductId + " ownerOfProductByProductId");

    var bidExpirationDate = productRepository.queryGetExpirationDateByProductId(productId);
    System.out.println(bidExpirationDate + " bidExpirationDate");
    Date date = new Date();
    long timeMilli = date.getTime();
    System.out.println(timeMilli+ "timeMilli");


    if(timeMilli>bidExpirationDate){
      System.out.println("Product has expired");
      throw new ResponseStatusException(HttpStatus.FORBIDDEN);
    }

    //System.out.println(ownerOfProductByProductId.getProductOwnerId().getId() + "ownerOfProductByProductId.getProductOwnerId().getId()");
    //If no bids
    if(bidsByProductId.size() != 0){
      var highestBidderId = bidsByProductId.get(0).getBidderId().getId();
      if (highestBidderId == bidder){
        System.out.println("Already highest bidder");
        throw new ResponseStatusException(HttpStatus.FORBIDDEN);
      }
      if(ownerOfProductByProductId.getProductOwnerId().getId() == bidder){
        System.out.println("Can not bid on your products");
        throw new ResponseStatusException(HttpStatus.FORBIDDEN);
      }

      //Checks if incoming bid is larger than current higher
      if(bidsByProductId.get(0).getPrice() < productPrice){
        return bidRepository.save(bid);
      }else{
        System.out.println("Price too low");
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
      }
    }else{
      if(ownerOfProductByProductId.getProductOwnerId().getId() == bidder){
        System.out.println("Can not bid on you products");
        throw new ResponseStatusException(HttpStatus.FORBIDDEN);
      }else{
        return bidRepository.save(bid);
      }
    }
  }

  public Bid updateById(long id, Map values) {
    Optional<Bid> bidOptional = getById(id);

    if(bidOptional.isPresent()) {
      var bid = bidOptional.get();
      Utilities.updatePrivateFields(bid, values);

      return bidRepository.save(bid);
    }

    return null;
  }

/*
  public List<Bid> getByProductId(long id) {
    return bidRepository.getByProductId(id);
  }*/
}
