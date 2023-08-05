package com.api.persons.services;

import com.api.persons.dtos.CreatePersonDTO;
import com.api.persons.models.PersonModel;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PersonService {

    PersonModel createPerson(CreatePersonDTO person);

    boolean existsByEmail(String email);

    Optional<PersonModel> findById(UUID id);

    void deletePerson(UUID id);

    List<PersonModel> findAll();

    PersonModel updatePerson(PersonModel person);
}
