package com.api.persons.view;

import lombok.Data;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
public class PersonView {
    private UUID id;
    private String name;
    private String email;
    private Instant birthDate;
    private String ein;
    private List<ContactView> contacts;
}
