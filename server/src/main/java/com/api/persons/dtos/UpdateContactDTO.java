package com.api.persons.dtos;

import com.api.persons.models.PersonModel;
import jakarta.annotation.Nullable;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.UUID;

@Data
public class UpdateContactDTO {
    @Id
    private UUID id;
    @NotBlank(message = "name field is missing!")
    private String name;
    @NotBlank(message = "phoneNumber field is missing!")
    private String phoneNumber;
    @NotBlank(message = "email field is missing!")
    @Email(message = "Invalid email!")
    private String email;
    @Nullable
    private PersonModel personModel;
}
