package com.api.persons.customErrors;

public record BadRequestResponse(String message, String field, Integer statusCode) {
}
