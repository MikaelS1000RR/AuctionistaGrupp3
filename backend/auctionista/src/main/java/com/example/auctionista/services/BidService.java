package com.example.auctionista.services;

import com.example.auctionista.Utilities;
import com.example.auctionista.entities.Bid;
import com.example.auctionista.repositories.BidRepository;
import com.example.auctionista.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    var productPrice = bid.getPrice();
    var bidder = bid.getBidderId();

    var bidsByProductId = bidRepository.queryGetByProductId(productId);

    var ownerOfProductByProductId = productRepository.queryGetOwnerOfProductByProductId(productId);

    //System.out.println(ownerOfProductByProductId.getProductOwnerId().getId() + "ownerOfProductByProductId.getProductOwnerId().getId()");
    /* test if bid works
    if(bidsByProductId.size() != 0){

      if(ownerOfProductByProductId.getProductOwnerId().getId() == bidder.getId() ){
        System.out.println("Can not bid on you products");
        return null;
      }
      if(bidsByProductId.get(0).getPrice() < productPrice){
        return bidRepository.save(bid);
      }else{
        System.out.println("Price too low");
        return null;
      }
    }else{
      if(ownerOfProductByProductId.getProductOwnerId().getId() == bidder.getId() ){
        System.out.println("Can not bid on you products");
        return null;
      }else{
        return bidRepository.save(bid);
      }
    }*/
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
