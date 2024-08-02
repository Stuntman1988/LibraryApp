import {BookModel} from "./BookModel.ts";

export class ShelfCurrentLoans {
    book: BookModel
    daysLeft: number

    constructor(book: BookModel, daysLeft: number) {
        this.book = book
        this.daysLeft = daysLeft
    }
}