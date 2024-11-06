package com.mylibrary.backend.exceptions;

public class BookNotAvailableException extends RuntimeException {

    // Constructor that accepts a custom message
    public BookNotAvailableException(String message) {
        super(message);
    }
}
