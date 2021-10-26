package com.example.auctionista.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Table(name="locations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Location {

  @Id
  @GeneratedValue
  private long id;
  @OneToMany(fetch= FetchType.EAGER, mappedBy = "locationId")
  @JsonIgnoreProperties({"locationId"})
  private List<Product> products;
  private String name;
}