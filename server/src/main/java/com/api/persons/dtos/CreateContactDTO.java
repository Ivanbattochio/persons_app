package com.api.persons.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateContactDTO {
    @NotBlank(message = "name field is missing!")
    private String name;
    @NotBlank(message = "phoneNumber field is missing!")
    private String phoneNumber;
    @NotBlank(message = "email field is missing!")
    @Email(message = "Invalid email!")
    private String email;
}
