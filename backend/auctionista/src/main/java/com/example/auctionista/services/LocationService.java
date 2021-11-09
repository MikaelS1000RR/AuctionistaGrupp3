package com.example.auctionista.services;

import com.example.auctionista.entities.Location;
import com.example.auctionista.repositories.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationService {

  @Autowired
  private LocationRepository locationRepository;

  public List<Location> getAllLocationsOrderbyId() {
    return locationRepository.getAllLocationsOrderbyId();
  }

  public Location createLocation(Location location) {
    return locationRepository.save(location);
  }

  public Optional<Location> getById(long id) {
    return locationRepository.findById(id);
  }
}
