package com.example.auctionista.controllers;

import com.example.auctionista.entities.Category;
import com.example.auctionista.entities.User;
import com.example.auctionista.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rest/categories")
public class CategoryController {

  @Autowired
  public CategoryService categoryService;

  @GetMapping
  public List<Category> getAllCategories() {
    return categoryService.getAllCategories();
  }

  @GetMapping("/{id}")
  public Optional<Category> getCategoryById(@PathVariable long id) {
    return categoryService.getById(id);
  }

  @PostMapping
  public Category createCategory(@RequestBody Category category) {
    return categoryService.createCategory(category);
  }

}
