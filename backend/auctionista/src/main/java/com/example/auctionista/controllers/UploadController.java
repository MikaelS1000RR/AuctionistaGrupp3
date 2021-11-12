package com.example.auctionista.controllers;

import com.example.auctionista.entities.Bid;
import com.example.auctionista.services.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;


import java.util.List;
import java.util.stream.Collectors;

@RestController
public class UploadController {

    @Autowired
    private UploadService uploadService;

    @PostMapping("/api/upload")
    public String upload(@RequestParam List<MultipartFile> files) {
        return uploadService.saveFiles(files);
    }


}

