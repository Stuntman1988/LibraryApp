package org.example.backendlibrary.controller;

import org.example.backendlibrary.dao.UserRepository;
import org.example.backendlibrary.entity.Book;
import org.example.backendlibrary.entity.User;
import org.example.backendlibrary.reponsemodels.ShelfCurrentLoansResponse;
import org.example.backendlibrary.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("api/books")
public class BookController {

    private BookService bookService;
    private UserRepository userRepository;

    @Autowired
    public BookController(BookService bookService, UserRepository userRepository) {
        this.bookService = bookService;
        this.userRepository = userRepository;
    }

    @GetMapping("/secure/currentloans/")
    public List<ShelfCurrentLoansResponse> currentLoans(@RequestHeader(value = "authToken") String token) throws Exception {
        Optional<User> user = userRepository.findUserByEmail(token);
        if (user.isEmpty()) {
            throw new Exception("User email is missing");
        }
        return bookService.currentLoans(user.get().getEmail());
    }

    @GetMapping("/secure/currentloans/count/")
    public int currentLoansCount(@RequestHeader(value = "authToken") String token) throws Exception {
        Optional<User> user = userRepository.findUserByEmail(token);
        if (user.isEmpty()) {
            throw new Exception("User email is missing");
        }
        return bookService.currentLoansCount(user.get().getEmail());
    }

    @GetMapping("/secure/ischeckedout/byuser/")
    public Boolean checkoutBookByUser(@RequestHeader(value = "authToken") String token, @RequestParam Long bookId) throws Exception {
        Optional<User> user = userRepository.findUserByEmail(token);
        if (user.isEmpty()) {
            throw new Exception("User email is missing");
        }
        return bookService.checkoutByUser(user.get().getEmail(), bookId);
    }

    @PutMapping("/secure/checkout/")
    public Book checkoutBook(@RequestHeader(value = "authToken") String token, @RequestParam Long bookId) throws Exception {
        Optional<User> user = userRepository.findUserByEmail(token);
        if (user.isEmpty()) {
            throw new Exception("User email is missing");
        }
        return bookService.checkoutBook(user.get().getEmail(), bookId);
    }

    @PutMapping("/secure/return/")
    public void returnBook(@RequestHeader(value = "authToken") String token, @RequestParam Long bookId) throws Exception {
        Optional<User> user = userRepository.findUserByEmail(token);
        if (user.isEmpty()) {
            throw new Exception("User email is missing");
        }
        bookService.returnBook(user.get().getEmail(), bookId);
    }

    @PutMapping("/secure/renew/loan/")
    public void renewLoan(@RequestHeader(value = "authToken") String token, @RequestParam Long bookId) throws Exception {
        Optional<User> user = userRepository.findUserByEmail(token);
        if (user.isEmpty()) {
            throw new Exception("User email is missing");
        }
        bookService.renewLoan(user.get().getEmail(), bookId);
    }
}
