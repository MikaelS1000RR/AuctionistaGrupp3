package com.example.auctionista.services;

import com.example.auctionista.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@Service
public class UploadService {

    @Autowired
    private UserService userService;

    public String saveFiles(List<MultipartFile> files) {

        // check if logged in
        // upd: doesn't work. We can check in  usercontext is User is logged in
        // delete this later ?
        User loggedInUser = userService.findCurrentUser();
        System.out.println(loggedInUser != null);

        //List<String> uploadUrls = new ArrayList<>();
        StringBuilder uploadUrls = new StringBuilder();


       // CWD = Current Working Directory
        // This property returns user working directory for application.
        String cwd = System.getProperty("user.dir");
        System.out.println(cwd);

        // We add uploads in for loop
        String uploadFolder = cwd + "/www";

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
                uploadUrls.append(uploadUrl);
                uploadUrls.append(",");
               // uploadUrls.add(uploadUrl);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        uploadUrls.deleteCharAt(uploadUrls.lastIndexOf(","));

        return uploadUrls.toString();
    }
}
