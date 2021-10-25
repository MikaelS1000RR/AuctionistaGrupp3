package com.example.auctionista.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Category {

  @Id
  @GeneratedValue
  private long id;
  private String name;
}