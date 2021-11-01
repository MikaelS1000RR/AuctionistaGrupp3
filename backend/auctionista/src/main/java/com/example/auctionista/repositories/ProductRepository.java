package com.example.auctionista.repositories;

import com.example.auctionista.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
  //@Query(value = "SELECT products.* FROM products WHERE title like (%:title%) AND (location_id=:locationId or :loactionId=null) AND (category_id =:categoryId or :categoryId=null)", nativeQuery = true)
  @Query(value = "SELECT products.* FROM products WHERE title = :title AND location_id=:locationId AND category_id =:categoryId", nativeQuery = true)
  List<Product> getProductByQueries(@Param("title") String title,
                                    @Param("locationId") long locationId,
                                    @Param("categoryId") long categoryId);
}
