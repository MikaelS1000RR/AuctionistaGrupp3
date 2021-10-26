package com.example.auctionista.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.util.List;


@Table(name="users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class User {

    @Id // Primary key
    @GeneratedValue // Auto increment
    private long id;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "productOwnerId")
    @JsonIgnoreProperties({"productOwnerId"})
    private List<Product> products;

    private String username;
    private String email;
    private String password;

    // prevent leaking password to frontend
    @JsonIgnore
    public String getPassword() {
        return password;
    }

    // enable password from frontend when logging in
    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "bidderId")
    @JsonIgnoreProperties({"bidderId"})
    private List<Bid> bids;




}
