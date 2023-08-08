package com.api.persons.services;

import com.api.persons.dtos.UpdateContactDTO;
import com.api.persons.models.ContactModel;
import com.api.persons.repositories.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Override
    public Optional<ContactModel> findById(UUID id) {
        return contactRepository.findById(id);
    }

    @Override
    public void deleteContact(UUID id) {
        contactRepository.deleteById(id);
    }

    public ContactModel updateContact(UpdateContactDTO updateContactDTO) {
        ContactModel contactModel = new ContactModel();

        contactModel.setName(updateContactDTO.getName());
        contactModel.setEmail(updateContactDTO.getEmail());
        contactModel.setPhoneNumber(updateContactDTO.getPhoneNumber());
        contactModel.setId(updateContactDTO.getId());

        return contactRepository.save(contactModel);
    }

}
