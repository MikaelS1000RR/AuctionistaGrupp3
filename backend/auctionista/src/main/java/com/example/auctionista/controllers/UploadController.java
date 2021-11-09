package com.example.auctionista.controllers;

import com.example.auctionista.services.UploadService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;
import java.util.Map;

@RestController
public class UploadController {

    @Autowired
    private UploadService uploadService;

    @PostMapping("/api/upload")
    public List<String> upload(@RequestParam List<MultipartFile> files)  {
        return uploadService.saveFiles(files);
    }

}

