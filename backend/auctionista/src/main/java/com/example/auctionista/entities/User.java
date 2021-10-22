package com.example.auctionista.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
@Document("user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id // Primary key
    @GeneratedValue // Auto increment
    private String id;

    private String username;
    private String email;
    private String password;



}
