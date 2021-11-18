package com.example.auctionista.repositories;

import com.example.auctionista.entities.Location;
import com.example.auctionista.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
  @Query(value = "SELECT locations.* FROM locations  ORDER BY id", nativeQuery = true)
  List<Location> getAllLocationsOrderbyId();
}
