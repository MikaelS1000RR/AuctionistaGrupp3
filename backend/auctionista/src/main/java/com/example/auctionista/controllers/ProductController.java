package com.example.auctionista.controllers;

import com.example.auctionista.entities.Product;
import com.example.auctionista.entities.User;
import com.example.auctionista.services.ProductService;
import com.example.auctionista.services.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

  @Autowired
  public ProductService productService;

  @Autowired
  public UserService userService;

  @GetMapping
  public List<Product> getAllProducts() {
    return productService.getAllProducts();
  }

  @GetMapping("/{id}")
  public Optional<Product> getProductById(@PathVariable long id) {
    return productService.getById(id);
  }


  @GetMapping("/queries")
  public List<Product> getProductByQueries(@RequestParam String title, @RequestParam long locationId, @RequestParam long categoryId ) {
    return productService.getProductByQueries(title,locationId,categoryId);
  }

  @GetMapping("/latestProduct")
  public List<Product> getLatestProduct(@RequestParam Long currentUserId) {
    return productService.getLatestProduct(currentUserId);
  }

  @PostMapping
  public Product createProduct(@RequestBody Product product, @RequestParam(value = "name", required = false) String name, @RequestParam(value = "breed", required = false) String breed) {
    System.out.println(name + " " + breed);
    return productService.createProduct(product);
  }

  @PostMapping("/newSubmit")
  public Product createProduct2(@RequestParam String product, @RequestParam List<MultipartFile> files) throws JsonProcessingException {

    System.out.println(product);
    ObjectMapper mapper = new ObjectMapper();
    Product product3 = mapper.readValue(product, Product.class);
    System.out.println(product3);

    for(var file : files) {
      System.out.println(file.getOriginalFilename());

    }

      return productService.createProduct(product3);

    }


  @PutMapping("/{id}")
  public Product updateProduct(@PathVariable long id, @RequestBody Map values) {
    return productService.updateById(id, values);
  }

}
