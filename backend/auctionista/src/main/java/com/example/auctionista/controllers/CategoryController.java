package com.example.auctionista.controllers;

import com.example.auctionista.entities.Category;
import com.example.auctionista.entities.User;
import com.example.auctionista.services.CategoryService;
import com.example.auctionista.statuses.NotFoundException;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
  public Object getCategoryById(@PathVariable long id) {
    Optional<Category> category = categoryService.getById(id);
    if(category.isEmpty()) {
      System.out.println("No such category has been found by categoryID: " + id);
      var error = new NotFoundException();
      return error.categoryNotFoundError(id);
    }
    return new ResponseEntity<>(category, HttpStatus.OK);
  }

  @PostMapping
  public Category createCategory(@RequestBody Category category) {
    return categoryService.createCategory(category);
  }

}
