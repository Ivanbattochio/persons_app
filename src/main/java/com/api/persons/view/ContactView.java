package com.api.persons.view;

import lombok.Data;

import java.util.UUID;

@Data
public class ContactView {
    private UUID id;
    private String name;
    private String email;
    private String phoneNumber;
}
