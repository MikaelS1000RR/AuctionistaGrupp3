package com.example.auctionista.repositories;

import com.example.auctionista.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
  @Query(value = "SELECT categories.* FROM categories  ORDER BY id", nativeQuery = true)
  List<Category> getAllCategoriesOrderById();
}
