package com.example.auctionista.entities;

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
  //private List<String> imgUrl;

  @OneToOne(targetEntity = Location.class, fetch = FetchType.LAZY)
  @JoinColumn(name = "id", insertable = false, updatable = false)
  private Location location;
  private String details;

  @OneToOne(targetEntity = Category.class, fetch = FetchType.LAZY)
  @JoinColumn(name = "id", insertable = false, updatable = false)
  private Category category;
  private String condition;

  @OneToOne(targetEntity = User.class, fetch = FetchType.LAZY)
  @JoinColumn(name = "id", insertable = false, updatable = false)
  private User productOwnerId;

  //@ManyToOne(targetEntity = Bid.class, fetch = FetchType.LAZY)
  //@JoinColumn(name = "id", insertable = false, updatable = false)
  //private List<Bid> bids;

}