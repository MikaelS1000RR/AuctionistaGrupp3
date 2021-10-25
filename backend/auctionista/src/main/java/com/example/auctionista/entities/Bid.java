package com.example.auctionista.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Table(name="bids")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Bid {

  @Id
  @GeneratedValue
  private long id;
  private double price;
  @OneToOne
  @JoinColumn(name = "id")
  private Product productId;
  //private User bidderId;
  private Date bidderTime;
}
