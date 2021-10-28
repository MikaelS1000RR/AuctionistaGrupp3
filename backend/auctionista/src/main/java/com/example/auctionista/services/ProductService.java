package com.example.auctionista.services;

import com.example.auctionista.Utilities;
import com.example.auctionista.entities.Product;
import com.example.auctionista.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProductService {

  @Autowired
  private ProductRepository productRepository;

  public List<Product> getAllProducts() {
    return productRepository.findAll();
  }

  public Product createProduct(Product product) {
    return productRepository.save(product);
  }

  public Optional<Product> getById(long id) {
    return productRepository.findById(id);
  }

  public Product updateById(long id, Map values) {
    Optional<Product> productOptional = getById(id);

    if(productOptional.isPresent()) {
      var product = productOptional.get();
      Utilities.updatePrivateFields(product, values);

      return productRepository.save(product);
    }

    return null;
  }
}
