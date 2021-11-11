package com.example.auctionista.controllers;

import com.example.auctionista.entities.Image;
import com.example.auctionista.entities.Product;
import com.example.auctionista.services.ImageService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    public ImageService imageService;

    @GetMapping
    public List<Image> getAllImages() {
        return imageService.getAllImages();
    }

    @GetMapping("/{id}")
    public Optional<Image> getImageById(@PathVariable long id) {
        return imageService.getImageById(id);
    }

    @PostMapping
    public ResponseEntity<Image> saveImage(@RequestBody String image) throws Exception {

            ObjectMapper mapper = new ObjectMapper();
            Image imageToSave = mapper.readValue(image, Image.class);
            System.out.println("imageToSave"+imageToSave);
            Image savedImage = imageService.saveImage(imageToSave);
            if (savedImage != null) {
                return ResponseEntity.ok(savedImage);
            } else {
                return ResponseEntity.badRequest().build();
            }

    }
}
