package com.example.auctionista.controllers;

import com.example.auctionista.entities.Category;
import com.example.auctionista.entities.Location;
import com.example.auctionista.entities.Product;
import com.example.auctionista.entities.User;
import com.example.auctionista.services.CategoryService;
import com.example.auctionista.services.LocationService;
import com.example.auctionista.services.ProductService;
import com.example.auctionista.services.UserService;
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
  @Autowired
  public LocationService locationService;
  @Autowired
  public CategoryService categoryService;
  @Autowired
  public UserService userService;

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
    //Check if locationId exists in Location Entity
    var locationId = product.getLocationId().getId();
    Optional<Location> location = locationService.getById(locationId);
    if (location.isEmpty()){
      System.out.println("The locationId doesn't exist in Location Entity");
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    //Check if categoryId exist in Category Entity
    var categoryId = product.getCategoryId().getId();
    Optional<Category> category = categoryService.getById(categoryId);
    if (category.isEmpty()){
      System.out.println("The categoryId doesn't exist in Category Entity");
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    //Check if productOwnerId exist in User Entity
    var productOwnerId = product.getProductOwnerId().getId();
    Optional<User> productOwner = userService.getById(productOwnerId);
    if (productOwner.isEmpty()){
      System.out.println("The productOwnerId doesn't exist in User Entity");
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

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
