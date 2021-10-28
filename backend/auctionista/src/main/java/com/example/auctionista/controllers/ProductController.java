package com.example.auctionista.controllers;

import com.example.auctionista.entities.Product;
import com.example.auctionista.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/rest/products")
public class ProductController {

  @Autowired
  public ProductService productService;

  @GetMapping
  public List<Product> getAllProducts() {
    return productService.getAllProducts();
  }

  @GetMapping("/{id}")
  public Optional<Product> getProductById(@PathVariable long id) {
    return productService.getById(id);
  }

  //dynamic url queries
  // localhost:8080/queries?name=Johan&age=32
  @GetMapping("/queries")
  public List<Product> getProductByQueries(@RequestParam String title, @RequestParam long locationId, @RequestParam long categoryId ) {
    return productService.getProductByQueries(title,locationId,categoryId);
  }

  @GetMapping("/test")
  public String testQueries(@RequestParam String title, @RequestParam long locationId, @RequestParam long categoryId ) {
    return String.format("Query! ", title, locationId,categoryId);
  }

  @PostMapping
  public Product createProduct(@RequestBody Product product) {
    return productService.createProduct(product);
  }

  @PutMapping("/{id}")
  public Product updateProduct(@PathVariable long id, @RequestBody Map values) {
    return productService.updateById(id, values);
  }

}
