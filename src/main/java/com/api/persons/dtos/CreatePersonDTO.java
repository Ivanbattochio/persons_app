package com.api.persons.dtos;

import jakarta.validation.constraints.*;
import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;

import java.time.Instant;

@Data
public class CreatePersonDTO {
    @NotBlank(message = "Name field is missing!")
    private String name;

    @NotBlank(message = "Email field is missing!")
    @Email(message = "Invalid email!")
    private String email;

    @NotNull(message = "Birthdate field is missing!")
    @Past(message = "Birthdate must be in the past")
    private Instant birthDate;

    @NotBlank(message = "Ein field is missing!")
    @CPF(message = "Not a valid ein!")
    private String ein;
}
