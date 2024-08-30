package org.example.backendlibrary.controller;

import com.stripe.model.PaymentIntent;
import org.example.backendlibrary.dao.UserRepository;
import org.example.backendlibrary.entity.User;
import org.example.backendlibrary.requestmodels.PaymentInfoRequest;
import org.example.backendlibrary.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("api/payment/secure")
public class PaymentController {

    private PaymentService paymentService;
    private UserRepository userRepository;

    @Autowired
    public PaymentController(PaymentService paymentService, UserRepository userRepository) {
        this.paymentService = paymentService;
        this.userRepository = userRepository;
    }

    @PostMapping("/payment-intent/")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfoRequest paymentInfoRequest) throws Exception {
        PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentInfoRequest);
        String paymentStr = paymentIntent.toJson();

        return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }

    @PutMapping("/payment-complete/")
    public ResponseEntity<String> stripePaymentComplete(@RequestHeader(value = "authToken") String token) throws Exception {
        Optional<User> user = userRepository.findUserByEmail(token);
        if (user.isEmpty()) {
            throw new Exception("User email is missing");
        }
        return paymentService.stripePayment(user.get().getEmail());
    }

}
