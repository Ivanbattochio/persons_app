package com.api.persons.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "TB_CONTACT")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContactModel implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, length = 128)
    private String name;

    @Column(nullable = false, length = 128)
    private String phoneNumber;

    @Column(nullable = false)
    private String email;

    @ManyToOne(optional = false)
    @JoinColumn(name = "person_id")
    private PersonModel person;

}
