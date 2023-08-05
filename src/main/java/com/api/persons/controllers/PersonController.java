package com.api.persons.controllers;


import com.api.persons.dtos.CreatePersonDTO;
import com.api.persons.dtos.UpdatePersonDTO;
import com.api.persons.view.PersonView;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/person")
public interface PersonController {

    @PostMapping
    ResponseEntity<Object> createPerson(@RequestBody @Valid CreatePersonDTO personDTO);

    @DeleteMapping("/{id}")
    ResponseEntity<Object> deletePerson(@PathVariable(value = "id") UUID id);

    @GetMapping("/{id}")
    ResponseEntity<Object> findPerson(@PathVariable(value = "id") UUID id);

    @GetMapping("/paginated")
    ResponseEntity<Object> findPersonPaginated(@RequestParam(value = "page") Integer page, @RequestParam(value = "size") Integer size);

    @GetMapping
    ResponseEntity<List<PersonView>> findAll();

    @PutMapping
    ResponseEntity<Object> updatePerson(@RequestBody @Valid UpdatePersonDTO personDTO);

}
