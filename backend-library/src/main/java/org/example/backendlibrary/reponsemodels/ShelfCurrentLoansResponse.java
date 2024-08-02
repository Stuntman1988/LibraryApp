package org.example.backendlibrary.reponsemodels;

import lombok.Data;
import org.example.backendlibrary.entity.Book;

@Data
public class ShelfCurrentLoansResponse {

    public ShelfCurrentLoansResponse(Book book, int daysLeft) {
        this.book = book;
        this.daysLeft = daysLeft;
    }

    private Book book;

    private int daysLeft;


}
