package com.api.persons.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "TB_PERSON")
@Getter
@Setter
public class PersonModel implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, length = 128)
    private String name;

    @Column(nullable = false, unique = true, length = 128)
    private String email;

    @Column(nullable = false)
    private Instant birthDate;

    @Column(nullable = false)
    private String ein;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "person")
    private List<ContactModel> contacts;

}
