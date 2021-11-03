package com.example.auctionista.controllers;

import com.example.auctionista.entities.Product;
import com.example.auctionista.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

  @Autowired
  public ProductService productService;

  @GetMapping
  public Page<Product> getAllProducts( Pageable pageable) {
    return productService.getAllProducts(pageable);
  }

  @GetMapping("/{id}")
  public Optional<Product> getProductById(@PathVariable long id) {
    return productService.getById(id);
  }

  @GetMapping("/queries")
  public Page<Product> getProductByQueries(@RequestParam String title, @RequestParam long locationId, @RequestParam long categoryId , Pageable pageable) {
    return productService.getProductByQueries(title,locationId,categoryId,pageable);
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
