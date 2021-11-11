package com.example.auctionista.repositories;

import com.example.auctionista.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
}
