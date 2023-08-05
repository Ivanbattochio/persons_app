package com.api.persons.view;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class PersonView {
    private UUID id;
    private String name;
    private String email;
    private Double balance;
    private Instant birthDate;
    private Instant createdAt;
    private Instant updatedAt;
}
