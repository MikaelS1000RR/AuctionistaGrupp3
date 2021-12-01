package com.example.auctionista.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

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

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "CategoryId")
  @JsonIgnoreProperties({"CategoryId","products"})
  private List<Product> products;
  private String name;
}