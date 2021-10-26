package com.example.auctionista.controllers;

import com.example.auctionista.entities.Location;
import com.example.auctionista.services.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rest/locations")
public class LocationController {

  @Autowired
  public LocationService locationService;

  @GetMapping
  public List<Location> getAllLocations() {
    return locationService.getAllLocations();
  }

  @GetMapping("/{id}")
  public Optional<Location> getLocationById(@PathVariable long id) {
    return locationService.getById(id);
  }

  @PostMapping
  public Location createLocation(@RequestBody Location location) {
    return locationService.createLocation(location);
  }
}
