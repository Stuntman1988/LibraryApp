package org.example.backendlibrary.service;

import jakarta.transaction.Transactional;
import org.example.backendlibrary.dao.UserRepository;
import org.example.backendlibrary.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean checkUserIfAdmin(String email) throws Exception {
        Optional<User> user = userRepository.findUserByEmail(email);
        if (user.isEmpty()) {
            throw new Exception("Email not exist!");
        }
        return user.get().isAdmin();
    }
}
