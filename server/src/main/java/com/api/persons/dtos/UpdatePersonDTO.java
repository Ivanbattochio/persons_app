package com.api.persons.dtos;

import com.api.persons.customAnnotations.NullOrNotBlank;
import jakarta.persistence.Id;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
public class UpdatePersonDTO {
    @Id
    private UUID id;
    @NullOrNotBlank(message = "Name field is missing!")
    private String name;
    @NullOrNotBlank
    @Email(message = "Invalid email!")
    private String email;
    @Past(message = "Birthdate must be in the past")
    private Instant birthDate;
    @NullOrNotBlank
    @CPF(message = "Not a valid ein!")
    private String ein;
    @Getter
    @Setter
    @Valid
    @NotNull(message = "contacts field is missing!")
    private List<UpdateContactDTO> contacts;
}