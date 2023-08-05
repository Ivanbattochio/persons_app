package com.api.persons.controllers;

import com.api.persons.dtos.CreatePersonDTO;
import com.api.persons.dtos.UpdatePersonDTO;
import com.api.persons.models.PersonModel;
import com.api.persons.services.PersonServiceImpl;
import com.api.persons.view.PersonView;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/person")
public class PersonController {
    @Autowired
    private PersonServiceImpl personService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping
    public ResponseEntity<Object> createPerson(@RequestBody @Valid CreatePersonDTO personDTO) {

        if (personService.existsByEmail(personDTO.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already in use!");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(convertToView(personService.createPerson(personDTO)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletePerson(@PathVariable(value = "id") UUID id) {

        Optional<PersonModel> person = personService.findById(id);

        if (person.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Person not found!");
        }

        personService.deletePerson(id);

        return ResponseEntity.status(HttpStatus.OK).body("");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findPerson(@PathVariable(value = "id") UUID id) {

        Optional<PersonModel> optionalPerson = personService.findById(id);

        if (optionalPerson.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Person not found!");
        }

        PersonModel personModel = optionalPerson.get();

        return ResponseEntity.status(HttpStatus.OK).body(convertToView(personModel));
    }

    @GetMapping
    public ResponseEntity<List<PersonView>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(personService.findAll().stream().map(this::convertToView).collect(Collectors.toList()));
    }

    @PutMapping
    public ResponseEntity<Object> updatePerson(@RequestBody @Valid UpdatePersonDTO personDTO) {
        Optional<PersonModel> optionalPerson = personService.findById(personDTO.getId());

        if (optionalPerson.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
        }

        PersonModel personModel = optionalPerson.get();
        modelMapper.map(personDTO, personModel);

        return ResponseEntity.status(HttpStatus.OK).body(convertToView(personService.updatePerson(personModel)));
    }

    private PersonView convertToView(PersonModel user) {
        return modelMapper.map(user, PersonView.class);
    }

}
