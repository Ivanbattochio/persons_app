package com.api.persons.security;

import com.api.persons.customErrors.BadRequestResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
    @Override
    protected ResponseEntity handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        BadRequestResponse response = new BadRequestResponse(ex.getBindingResult().getFieldErrors().get(0).getDefaultMessage(), ex.getBindingResult().getFieldErrors().get(0).getField(), ex.getBody().getStatus());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}