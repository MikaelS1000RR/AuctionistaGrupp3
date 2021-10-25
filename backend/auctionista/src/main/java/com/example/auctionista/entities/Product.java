package com.example.auctionista.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.mapping.ToOne;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

  @Id
  @GeneratedValue
  private long id;
  private String brand;
  private String title;
  private String description;
  private double startingPrice;
  private Date uploadDate;
  private Date endDate;

  @OneToOne
  @JoinColumn(name = "id")
  private Location location;
  private String details;

  @OneToOne
  @JoinColumn(name = "id")
  private Category category;
  private String color;

  @OneToOne
  @JoinColumn(name = "id")
  private User productOwnerId;

  @ManyToOne(targetEntity = Bid.class, fetch = FetchType.EAGER)
  @JoinColumn(name = "id")
  private List<Bid> bids;
  private List<String> imgUrl;

}