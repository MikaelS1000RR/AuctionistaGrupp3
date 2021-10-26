package com.example.auctionista.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

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

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name="bidderId")
  @JsonIgnoreProperties({"products","bids"})
  private User bidderId;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name="productId")
  @JsonIgnoreProperties({"bids","productOwnerId"})
  private Product productId;

  private double price;
  private Date bidderTime;

}
