package com.example.auctionista.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

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
  private String name;
}