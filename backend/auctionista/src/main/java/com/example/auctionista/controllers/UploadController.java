package com.example.auctionista.controllers;

import com.example.auctionista.services.UploadService;
import com.example.auctionista.services.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;


import java.util.List;
import java.util.Map;

@RestController
public class UploadController {

    @Autowired
    private UploadService uploadService;
    @Autowired
    private UserService userService;

    @PostMapping("/api/upload")
    public List<String> upload(@RequestParam List<MultipartFile> files)  {
        var  currentUser = userService.findCurrentUser();
        if (currentUser == null){
            System.out.println("You must login in first to upload");
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        return uploadService.saveFiles(files);
    }

}

