package com.example.auctionista.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Table(name="bids")
@Getter
@Setter
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
