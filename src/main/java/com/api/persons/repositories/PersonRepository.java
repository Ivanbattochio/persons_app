package com.api.persons.repositories;

import com.api.persons.models.PersonModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PersonRepository extends JpaRepository<PersonModel, UUID> {

    boolean existsByEmail(String email);
}
