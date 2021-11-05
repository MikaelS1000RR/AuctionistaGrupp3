package com.example.auctionista.repositories;

import com.example.auctionista.entities.Bid;
import com.example.auctionista.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {
    @Query(value = "SELECT * FROM bids WHERE product_id = :id ORDER BY price DESC", nativeQuery = true)
    List<Bid> getByProductId(@Param("id") Long id);
}
