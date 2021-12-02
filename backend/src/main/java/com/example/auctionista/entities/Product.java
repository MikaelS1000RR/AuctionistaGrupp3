package com.example.auctionista.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Table(name="products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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
  private String imageUrl;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "locationId")
  @JsonIgnoreProperties({"products"})
  private Location locationId;

 @ManyToOne(fetch = FetchType.EAGER)
 @JoinColumn(name = "productOwnerId")
 @JsonIgnoreProperties({"products", "bids"})
 private User productOwnerId;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "CategoryId")
  @JsonIgnoreProperties({"products"})
  private Category CategoryId;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "productId")
  @JsonIgnoreProperties({"productId"})
  private List<Bid> bids;


    public Product(Object title, Object brand, Object details, Object categoryId, Object startingPrice, Object endDate, Object condition, Object locationId, Object description, Object uploadDate, Object productOwnerId, String image) {
    }
}