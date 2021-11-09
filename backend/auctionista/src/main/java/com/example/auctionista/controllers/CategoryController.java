package com.example.auctionista.controllers;

import com.example.auctionista.entities.Category;
import com.example.auctionista.entities.User;
import com.example.auctionista.services.CategoryService;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
  public ResponseEntity<Category> getCategoryById(@PathVariable long id) {
    Optional<Category> category = categoryService.getById(id);
    if(category.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<Category>(category.get(), HttpStatus.OK);
  }

  @PostMapping
  public Category createCategory(@RequestBody Category category) {
    return categoryService.createCategory(category);
  }

}
