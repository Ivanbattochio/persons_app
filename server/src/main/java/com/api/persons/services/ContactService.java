package com.api.persons.services;

import com.api.persons.dtos.UpdateContactDTO;
import com.api.persons.models.ContactModel;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Transactional
public interface ContactService {

    Optional<ContactModel> findById(UUID id);

    void deleteContact(UUID id);

    ContactModel updateContact(UpdateContactDTO updateContactDTO);

}
