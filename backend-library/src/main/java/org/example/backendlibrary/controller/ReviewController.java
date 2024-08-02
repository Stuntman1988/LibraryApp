package org.example.backendlibrary.controller;

import org.example.backendlibrary.dao.UserRepository;
import org.example.backendlibrary.entity.User;
import org.example.backendlibrary.requestmodels.ReviewRequest;
import org.example.backendlibrary.service.ReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService;
    private UserRepository userRepository;

    public ReviewController(ReviewService reviewService, UserRepository userRepository) {
        this.reviewService = reviewService;
        this.userRepository = userRepository;
    }

    @GetMapping("/secure/user/book/")
    public Boolean reviewBookByUser(@RequestHeader(value = "authToken") String token, @RequestParam Long bookId) throws Exception {
        Optional<User> user = userRepository.findUserByEmail(token);
        if (user.isEmpty()) {
            throw new Exception("User email is missing");
        }
        return reviewService.userReviewListed(user.get().getEmail(), bookId);
    }

    @PostMapping("/secure/")
    public void postReview(@RequestHeader(value = "authToken") String token, @RequestBody ReviewRequest reviewRequest) throws Exception {
        Optional<User> user = userRepository.findUserByEmail(token);
        if (user.isEmpty()) {
            throw new Exception("User email is missing");
        }
        reviewService.postReview(user.get().getEmail(), reviewRequest);
    }
}
