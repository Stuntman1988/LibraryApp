package org.example.backendlibrary.controller;

import org.example.backendlibrary.dao.UserRepository;
import org.example.backendlibrary.entity.User;
import org.example.backendlibrary.requestmodels.AddBookRequest;
import org.example.backendlibrary.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private AdminService adminService;
    private UserRepository userRepository;

    @Autowired
    public AdminController(AdminService adminService, UserRepository userRepository) {
        this.adminService = adminService;
        this.userRepository = userRepository;
    }

    @PostMapping("/secure/add/book/")
    public void postBook(@RequestHeader(value = "authToken") String token, @RequestBody AddBookRequest addBookRequest) throws Exception {
        Optional<User> user = userRepository.findUserByEmail(token);
        if (user.isEmpty()) {
            throw new Exception("User email is missing");
        }
        adminService.postBook(addBookRequest);
    }
}
