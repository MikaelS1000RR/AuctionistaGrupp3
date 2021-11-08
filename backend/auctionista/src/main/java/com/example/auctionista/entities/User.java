package com.example.auctionista.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;


import javax.persistence.*;
import java.util.List;


@Entity
@Table(name="users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id // Primary key
    @GeneratedValue // Auto increment
    private long id;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "productOwnerId")
    @JsonIgnoreProperties({"productOwnerId","bids"})
    private List<Product> products;

    // Pre-defined messaged for the frontend display
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
