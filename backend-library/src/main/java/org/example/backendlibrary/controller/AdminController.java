package org.example.backendlibrary.controller;

import org.example.backendlibrary.dao.UserRepository;
import org.example.backendlibrary.entity.User;
import org.example.backendlibrary.requestmodels.AddBookRequest;
import org.example.backendlibrary.service.AdminService;
import org.example.backendlibrary.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private AdminService adminService;
    private UserRepository userRepository;
    private UserService userService;

    @Autowired
    public AdminController(AdminService adminService, UserRepository userRepository, UserService userService) {
        this.adminService = adminService;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @PutMapping("/secure/increase/book/quantity/")
    public void increaseBookQuantity(@RequestHeader(value = "authToken") String token, @RequestParam Long bookId) throws Exception {
        boolean isAdmin = userService.checkUserIfAdmin(token);
        if (!isAdmin) {
            throw new Exception("Admin page only!");
        }
        adminService.increaseBookQuantity(bookId);
    }

    @PutMapping("/secure/decrease/book/quantity/")
    public void decreaseBookQuantity(@RequestHeader(value = "authToken") String token, @RequestParam Long bookId) throws Exception {
        boolean isAdmin = userService.checkUserIfAdmin(token);
        if (!isAdmin) {
            throw new Exception("Admin page only!");
        }
        adminService.decreaseBookQuantity(bookId);
    }

    @PostMapping("/secure/add/book/")
    public void postBook(@RequestHeader(value = "authToken") String token, @RequestBody AddBookRequest addBookRequest) throws Exception {
        boolean isAdmin = userService.checkUserIfAdmin(token);
        if (!isAdmin) {
            throw new Exception("Admin page only!");
        }
        adminService.postBook(addBookRequest);
    }

    @DeleteMapping("/secure/delete/book/")
    public void deleteBook(@RequestHeader(value = "authToken") String token, @RequestParam Long bookId) throws Exception {
        boolean isAdmin = userService.checkUserIfAdmin(token);
        if (!isAdmin) {
            throw new Exception("Admin page only!");
        }
        adminService.deleteBook(bookId);
    }
}
