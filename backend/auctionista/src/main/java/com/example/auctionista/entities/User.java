package com.example.auctionista.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Table(name="users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements Serializable{

    @Id // Primary key
    @GeneratedValue // Auto increment
    private long id;

    // Pre-defined messaged for the frontend display
    @NotEmpty(message = "Username can not be empty")
    private String username;

    @NotEmpty(message = "Email can not be empty")
    @Email(message = "Please provide a valid email id")
    private String email;

    @NotEmpty(message = "Password can not be empty")
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




}
