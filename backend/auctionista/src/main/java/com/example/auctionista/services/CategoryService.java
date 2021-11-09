package com.example.auctionista.services;

import com.example.auctionista.entities.Category;
import com.example.auctionista.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

  @Autowired
  private CategoryRepository categoryRepository;

  public List<Category> getAllCategoriesOrderById() {
    return categoryRepository.getAllCategoriesOrderById();
  }

  public Optional<Category> getById(long id) {
    return categoryRepository.findById(id);
  }

  public Category createCategory(Category category) {
    return categoryRepository.save(category);
  }
}
