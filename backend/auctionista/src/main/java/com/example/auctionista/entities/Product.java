package com.example.auctionista.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.mapping.ToOne;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Table(name="products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Product {

  @Id
  @GeneratedValue
  private long id;
  private String brand;
  private String title;
  private String description;
  private double startingPrice;
  private String uploadDate;
  private String endDate;
  private String details;
  private String condition;
  //private List<String> imgUrl;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "locationId")
  @JsonIgnoreProperties({"products"})
  private Location locationId;

 @ManyToOne(fetch = FetchType.EAGER)
 @JoinColumn(name = "productOwnerId")
 @JsonIgnoreProperties({"products"})
 private User productOwnerId;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "CategoryId")
  @JsonIgnoreProperties({"products"})
  private Category CategoryId;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "productId")
  @JsonIgnoreProperties({"bids"})
  private List<Bid> bids;


}