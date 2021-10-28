package com.example.auctionista.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class UploadService {


    public List<String> saveFiles(List<MultipartFile> files) {

        for(var file : files) {
            System.out.println(file.getOriginalFilename());

            var uploadUrl = "/uploads/" + file.getOriginalFilename();

            // create destination to save uploaded file
            File toSave = new File(uploadUrl);

            try {
                // move upload to uploads folder
                file.transferTo(toSave);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return null;
    }
}
