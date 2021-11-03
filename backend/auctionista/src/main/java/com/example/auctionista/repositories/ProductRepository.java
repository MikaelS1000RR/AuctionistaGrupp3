package com.example.auctionista.repositories;

import com.example.auctionista.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {
  Pageable firstPageWithTwoElements = PageRequest.of(0, 2);

  Pageable secondPageWithFiveElements = PageRequest.of(1, 5);
  //@Query(value = "SELECT products.* FROM products WHERE title like (%:title%) AND (location_id=:locationId or :loactionId=null) AND (category_id =:categoryId or :categoryId=null)", nativeQuery = true)
  @Query(value = "SELECT products.* FROM products WHERE title like (%:title%) AND (location_id=:locationId or :locationId=0) AND (category_id =:categoryId or :categoryId = 0)", nativeQuery = true)
  Page<Product> getProductByQueries(@Param("title") String title,
                                    @Param("locationId") long locationId,
                                    @Param("categoryId") long categoryId, Pageable firstPageWithTwoElements);
}
