package org.example.backendlibrary.controller;

import org.example.backendlibrary.service.UserService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("search/checkIfUserIsAdmin/")
    public boolean checkIfUserIsAdmin(@RequestHeader(value = "authToken") String token) throws Exception {
        return userService.checkUserIfAdmin(token);
    }
}
