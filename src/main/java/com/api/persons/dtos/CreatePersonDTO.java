package com.api.persons.dtos;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;

import java.time.Instant;
import java.util.List;

@Data
public class CreatePersonDTO {
    @NotBlank(message = "name field is missing!")
    private String name;

    @NotBlank(message = "email field is missing!")
    @Email(message = "Invalid email!")
    private String email;

    @NotNull(message = "birthdate field is missing!")
    @Past(message = "birthdate must be in the past")
    private Instant birthDate;

    @NotBlank(message = "ein field is missing!")
    @CPF(message = "Not a valid ein!")
    private String ein;

    @Getter
    @Setter
    @Valid
    @NotNull(message = "contacts field is missing!")
    private List<CreateContactDTO> contacts;
}
