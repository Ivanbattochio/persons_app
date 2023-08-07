package com.api.persons.controllers;

import com.api.persons.dtos.CreatePersonDTO;
import com.api.persons.dtos.UpdatePersonDTO;
import com.api.persons.models.PersonModel;
import com.api.persons.services.PersonServiceImpl;
import com.api.persons.view.PersonView;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;


@Slf4j
@RestController
public class PersonControllerImpl implements PersonController {
    @Autowired
    private PersonServiceImpl personService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ResponseEntity<Object> createPerson(@RequestBody @Valid CreatePersonDTO personDTO) {
        log.info("POST /person");
        if (personService.existsByEmail(personDTO.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already in use!");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(convertToView(personService.createPerson(personDTO)));
    }

    @Override
    public ResponseEntity<Object> deletePerson(@PathVariable(value = "id") UUID id) {
        log.info("DELETE /person");
        Optional<PersonModel> person = personService.findById(id);

        if (person.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Person not found!");
        }

        personService.deletePerson(id);

        return ResponseEntity.status(HttpStatus.OK).body("");
    }

    @Override
    public ResponseEntity<Object> findPerson(@PathVariable(value = "id") UUID id) {
        log.info("GET /person/{id}");
        Optional<PersonModel> optionalPerson = personService.findById(id);

        if (optionalPerson.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Person not found!");
        }

        PersonModel personModel = optionalPerson.get();

        return ResponseEntity.status(HttpStatus.OK).body(convertToView(personModel));
    }

    @Override
    public ResponseEntity<Object> findPersonPaginated(@ParameterObject Pageable pageable) {
        log.info("GET /paginated");
        Page<PersonModel> personModelPage = personService.findPaginated(pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());

        long documentCount = personService.count();

        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Total-Count", String.valueOf(documentCount));

        return ResponseEntity.status(HttpStatus.OK).headers(headers).body(personModelPage.stream().map(this::convertToView).collect(Collectors.toList()));
    }

    @Override
    public ResponseEntity<List<PersonView>> findAll() {
        log.info("GET /person");
        return ResponseEntity.status(HttpStatus.OK).body(personService.findAll().stream().map(this::convertToView).collect(Collectors.toList()));
    }

    @Override
    public ResponseEntity<Object> updatePerson(@RequestBody @Valid UpdatePersonDTO personDTO) {
        log.info("PUT /person");
        Optional<PersonModel> optionalPerson = personService.findById(personDTO.getId());

        if (optionalPerson.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Person not found!");
        }

        PersonModel personModel = optionalPerson.get();
        modelMapper.map(personDTO, personModel);

        return ResponseEntity.status(HttpStatus.OK).body(convertToView(personService.updatePerson(personModel)));
    }

    private PersonView convertToView(PersonModel user) {
        return modelMapper.map(user, PersonView.class);
    }

}
