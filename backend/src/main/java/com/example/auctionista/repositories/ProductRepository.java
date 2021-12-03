package com.example.auctionista.repositories;

import com.example.auctionista.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

  @Query(value = "SELECT products.* FROM products WHERE title like (%:title%) AND (location_id=:locationId or :locationId=0) AND (category_id =:categoryId or :categoryId = 0)", nativeQuery = true)
  List<Product> getProductByQueries(@Param("title") String title,
                                    @Param("locationId") long locationId,
                                    @Param("categoryId") long categoryId);


  @Query(value = "SELECT products.* FROM products WHERE id = :id", nativeQuery = true)
  Product queryGetOwnerOfProductByProductId(@Param("id") Long id);

  @Query(value = "SELECT end_date FROM products WHERE id = :id", nativeQuery = true)
  Long queryGetExpirationDateByProductId(@Param("id") Long id);
}
