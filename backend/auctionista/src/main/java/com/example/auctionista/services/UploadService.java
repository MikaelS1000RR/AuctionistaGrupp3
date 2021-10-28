package com.example.auctionista.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class UploadService {


    public List<String> saveFiles(List<MultipartFile> files) {

        List<String> uploadUrls = new ArrayList<>();


       // CWD = Current Working Directory
        // This property returns user working directory for application.
        String cwd = System.getProperty("user.dir");
        System.out.println(cwd);

        // We add uploads in for loop
        String uploadFolder = cwd + "/auctionista/src/main/resources/static";

        for(var file : files) {
            System.out.println(file.getOriginalFilename());

            var uploadUrl = "/uploads/" + file.getOriginalFilename();

            // create destination to save uploaded file
            // it's unique for your computer
            // it goes down to upload map
            File toSave = new File(uploadFolder + uploadUrl);

            try {
                // move upload to uploads folder
                file.transferTo(toSave);

                uploadUrls.add(uploadUrl);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return uploadUrls;
    }
}
