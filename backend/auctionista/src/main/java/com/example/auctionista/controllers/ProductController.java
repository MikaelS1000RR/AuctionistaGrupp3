package com.example.auctionista.controllers;

import com.example.auctionista.ProductNotFoundException;
import com.example.auctionista.entities.Product;
import com.example.auctionista.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
//import com.example.auctionista.ProductNotFoundException;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

  @Autowired
  public ProductService productService;


  @GetMapping
  public List<Product> getAllProducts() {
    return productService.getAllProducts();
  }

  @GetMapping("/{id}")
  public Object getProductById(@PathVariable long id) {
    Optional<Product> product =  productService.getById(id);
    if (product.isEmpty()) {
      System.out.println("Product not found by product Id: "+id);
      var error = new ProductNotFoundException();
      return error.productNotFoundError(id);

    }
    return new ResponseEntity<>(product,HttpStatus.OK);
  }

  @GetMapping("/queries")
  public List<Product> getProductByQueries(@RequestParam String title, @RequestParam long locationId, @RequestParam long categoryId ) {
    return productService.getProductByQueries(title,locationId,categoryId);
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
