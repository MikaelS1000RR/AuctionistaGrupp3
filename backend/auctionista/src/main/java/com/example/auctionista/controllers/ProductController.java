package com.example.auctionista.controllers;

import com.example.auctionista.entities.Product;
import com.example.auctionista.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

  @Autowired
  public ProductService productService;

  @GetMapping
  public ResponseEntity<List<Product>> getAllProducts() {
    List<Product> products = productService.getAllProducts();
     if (products.isEmpty()) {
       throw new ResponseStatusException(HttpStatus.NOT_FOUND);
     }
    return new ResponseEntity<List<Product>>(products,HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Product> getProductById(@PathVariable long id) {
    Optional<Product> product = productService.getById(id);
    if(product.isEmpty()) {
       throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<Product>(product.get(), HttpStatus.OK);
  }

  @GetMapping("/queries")
  public ResponseEntity<List<Product>> getProductByQueries(@RequestParam String title, @RequestParam long locationId, @RequestParam long categoryId ) {
    List<Product> productsByQueries = productService.getProductByQueries(title, locationId, categoryId);
    if (productsByQueries.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<List<Product>>(productsByQueries, HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<Product> createProduct(@RequestBody Product product) {
    Product createdProduct = productService.createProduct(product);
    if (createdProduct ==null){
      System.out.println("create product error");
      throw new ResponseStatusException(HttpStatus.EXPECTATION_FAILED);
    }
    return new ResponseEntity<Product>(createdProduct,HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  public Product updateProduct(@PathVariable long id, @RequestBody Map values) {
    return productService.updateById(id, values);
  }

}
