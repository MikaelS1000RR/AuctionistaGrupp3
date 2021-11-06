package com.example.auctionista.controllers;

import com.example.auctionista.entities.Location;
import com.example.auctionista.services.LocationService;
import com.example.auctionista.statuses.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
  public Object getLocationById(@PathVariable long id) {
    Optional<Location> location = locationService.getById(id);
    if(location.isEmpty()) {
      System.out.println("No such location has been found by locationID: " + id);
      var error = new NotFoundException();
      return error.locationNotFoundError(id);
    }
     return new ResponseEntity<>(location, HttpStatus.OK);
  }

  @PostMapping
  public Location createLocation(@RequestBody Location location) {
    return locationService.createLocation(location);
  }
}
