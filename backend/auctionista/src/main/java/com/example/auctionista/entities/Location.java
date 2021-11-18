package com.example.auctionista.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Table(name="locations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Location {

  @Id
  @GeneratedValue
  private long id;
  @OneToMany(fetch= FetchType.EAGER, mappedBy = "locationId")
  @JsonIgnoreProperties({"products","locationId"})
  private List<Product> products;
  private String name;
}