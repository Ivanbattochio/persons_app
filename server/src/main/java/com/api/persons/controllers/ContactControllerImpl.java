package com.api.persons.controllers;

import com.api.persons.dtos.UpdateContactDTO;
import com.api.persons.models.ContactModel;
import com.api.persons.services.ContactServiceImpl;
import com.api.persons.view.ContactView;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.UUID;


@Slf4j
@RestController
public class ContactControllerImpl implements ContactController {
    @Autowired
    private ContactServiceImpl contactService;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public ResponseEntity<Object> deleteContact(@PathVariable(value = "id") UUID id) {
        log.info("DELETE /contact/{id}");
        Optional<ContactModel> contactModel = contactService.findById(id);

        if (contactModel.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Contact not found!");
        }

        contactService.deleteContact(id);

        return ResponseEntity.status(HttpStatus.OK).body("");
    }

    @Override
    public ResponseEntity<Object> updateContact(@RequestBody @Valid UpdateContactDTO contactDTO) {
        log.info("PUT /contact");

        return ResponseEntity.status(HttpStatus.OK).body(convertToView(contactService.updateContact(contactDTO)));
    }


    private ContactView convertToView(ContactModel user) {
        return modelMapper.map(user, ContactView.class);
    }

}
