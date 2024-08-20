package org.example.backendlibrary.service;

import org.example.backendlibrary.dao.BookRepository;
import org.example.backendlibrary.dao.CheckoutRepository;
import org.example.backendlibrary.dao.ReviewRepository;
import org.example.backendlibrary.entity.Book;
import org.example.backendlibrary.requestmodels.AddBookRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AdminService {

    private final BookRepository bookRepository;
    private final ReviewRepository reviewRepository;
    private final CheckoutRepository checkoutRepository;

    @Autowired
    public AdminService(BookRepository bookRepository, ReviewRepository reviewRepository, CheckoutRepository checkoutRepository) {
        this.bookRepository = bookRepository;
        this.reviewRepository = reviewRepository;
        this.checkoutRepository = checkoutRepository;
    }

    public void increaseBookQuantity(Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);

        if (book.isEmpty()) {
            throw new Exception("Book was not found!");
        }

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() + 1);
        book.get().setCopies(book.get().getCopies() + 1);
        bookRepository.save(book.get());
    }

    public void decreaseBookQuantity(Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);

        if (book.isEmpty() || book.get().getCopiesAvailable() <= 0 || book.get().getCopies() <= 0) {
            throw new Exception("Book was not found or quantity locked");
        }

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        book.get().setCopies(book.get().getCopies() - 1);
        bookRepository.save(book.get());
    }

    public void postBook(AddBookRequest addBookRequest) {
        Book book = new Book();
        book.setTitle(addBookRequest.getTitle());
        book.setAuthor(addBookRequest.getAuthor());
        book.setDescription(addBookRequest.getDescription());
        book.setCopies(addBookRequest.getCopies());
        book.setCopiesAvailable(addBookRequest.getCopies());
        book.setCategory(addBookRequest.getCategory());
        book.setImg(addBookRequest.getImg());
        bookRepository.save(book);
    }

    public void deleteBook(Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);

        if (book.isEmpty()) {
            throw new Exception("Book was not found!");
        }

        bookRepository.delete(book.get());
        reviewRepository.deleteAllByBookId(bookId);
        checkoutRepository.deleteAllByBookId(bookId);
    }

}
