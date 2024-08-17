package org.example.backendlibrary.controller;

import org.example.backendlibrary.dao.UserRepository;
import org.example.backendlibrary.entity.Message;
import org.example.backendlibrary.entity.User;
import org.example.backendlibrary.requestmodels.AdminQuestionRequest;
import org.example.backendlibrary.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("api/messages")
public class MessageController {

    private MessageService messageService;
    private UserRepository userRepository;

    @Autowired
    public MessageController(MessageService messageService, UserRepository userRepository) {
        this.messageService = messageService;
        this.userRepository = userRepository;
    }

    @PostMapping("/secure/add/message/")
    public void postMessage(@RequestHeader(value = "authToken") String token, @RequestBody Message messageRequest) throws Exception {
        Optional<User> user = userRepository.findUserByEmail(token);
        if (user.isEmpty()) {
            throw new Exception("User email is missing");
        }
        messageService.postMessage(messageRequest, user.get().getEmail());
    }

    @PutMapping("/secure/admin/message/")
    public void putMessage(@RequestHeader(value = "authToken") String token, @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception {
        Optional<User> user = userRepository.findUserByEmail(token);
        if (user.isEmpty()) {
            throw new Exception("User email is missing");
        }
        if (!user.get().isAdmin()) {
            throw new Exception("User is not an admin");
        }
        messageService.putMessage(adminQuestionRequest, user.get().getEmail());
    }
}
