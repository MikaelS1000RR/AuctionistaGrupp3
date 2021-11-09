package com.example.auctionista.controllers;

import com.example.auctionista.entities.Product;
import com.example.auctionista.services.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
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


  @PostMapping
  public Product createProduct(@RequestBody Product product, @RequestParam(value = "name", required = false) String name, @RequestParam(value = "breed", required = false) String breed) {
    System.out.println(name + " " + breed);
    return productService.createProduct(product);
  }

  @PostMapping("/newSubmit")
  public Product createProduct2(@ModelAttribute  Product product1, @RequestParam String product) throws JsonProcessingException {

    ObjectMapper mapper = new ObjectMapper();
    Map userMap = mapper.readValue(product, Map.class);

    System.out.println(userMap.get("title"));
    System.out.println(userMap.get("brand"));
    System.out.println(userMap.get("details"));
    System.out.println(userMap.get("categoryId"));
    System.out.println(userMap.get("startingPrice"));
    System.out.println(userMap.get("endDate"));
    System.out.println(userMap.get("condition"));
    System.out.println(userMap.get("locationId"));
    System.out.println(userMap.get("description"));
    System.out.println(userMap.get("uploadDate"));
    System.out.println(userMap.get("productOwnerId"));

    var title = userMap.get("title");
    var brand = userMap.get("brand");
    var details = userMap.get("details");
    var categoryId = userMap.get("categoryId");
    var startingPrice = userMap.get("startingPrice");
    var endDate = userMap.get("endDate");
    var condition = userMap.get("condition");
    var locationId = userMap.get("locationId");
    var description = userMap.get("description");
    var uploadDate = userMap.get("uploadDate");
    var productOwnerId = userMap.get("productOwnerId");
    var image = "";


    System.out.println(title + " " + brand);


  /*  Product product1 = new Product(title, brand, details, categoryId, startingPrice, endDate, condition,
            locationId, description, uploadDate, productOwnerId, image);
    System.out.println("THIS IS PRODUCT 1 ---> " + product1); */

      return productService.createProduct(product1);
    }


  @PutMapping("/{id}")
  public Product updateProduct(@PathVariable long id, @RequestBody Map values) {
    return productService.updateById(id, values);
  }

}
