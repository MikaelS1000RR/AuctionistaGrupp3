package com.example.auctionista.services;

import com.example.auctionista.Utilities;
import com.example.auctionista.entities.Bid;
import com.example.auctionista.repositories.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BidService {

  @Autowired
  private BidRepository bidRepository;

  public List<Bid> getAllBids() {
    return bidRepository.findAll();
  }

  public Optional<Bid> getById(long id) {
    return bidRepository.findById(id);
  }

  public Bid createBid(Bid bid) {
    System.out.println(bid);
    var product = bid.getProductId();
    var productId = bid.getProductId().getId();
    System.out.println(productId);
   var bidsByProductId = bidRepository.queryGetByProductId(productId);
    System.out.println("It worked");

    System.out.println(bidsByProductId+ "bidsByProductId");
    System.out.println(bidsByProductId.get(0) + " bidsByProductId.get(0)");
    System.out.println(bidsByProductId.get(0).getPrice() + " bidsByProductId.get(0).getPrice()");

    System.out.println(bid);

    return bidRepository.save(bid);
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
