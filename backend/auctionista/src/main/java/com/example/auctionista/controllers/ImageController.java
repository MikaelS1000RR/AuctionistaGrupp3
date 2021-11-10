package com.example.auctionista.controllers;

import com.example.auctionista.entities.Image;
import com.example.auctionista.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public Image saveImage(@RequestBody Image image) throws Exception {
        return imageService.saveImage(image);
    }


}
