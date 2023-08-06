package com.api.persons.controllers;


import com.api.persons.dtos.CreatePersonDTO;
import com.api.persons.dtos.UpdatePersonDTO;
import com.api.persons.view.PersonView;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/person")
@Tag(name = "Persons API")
public interface PersonController {

    @PostMapping
    @Operation(summary = "Create a person")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Creation successful",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = PersonView.class))}),
            @ApiResponse(responseCode = "409",
                    description = "Conflict"),
    })
    ResponseEntity<Object> createPerson(@RequestBody @Valid CreatePersonDTO personDTO);

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a person by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Delete successful"),
            @ApiResponse(responseCode = "404",
                    description = "Person not found"),
    })
    ResponseEntity<Object> deletePerson(@PathVariable(value = "id") UUID id);

    @GetMapping("/{id}")
    @Operation(summary = "Get a person by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Fetch successful",
                    content = {@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = PersonView.class)))}),
            @ApiResponse(responseCode = "404",
                    description = "Person not found"),
    })
    ResponseEntity<Object> findPerson(@PathVariable(value = "id") UUID id);

    @GetMapping("/paginated")
    @Operation(summary = "Get persons paginated")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Fetch successful",
                    content = {@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = PersonView.class)))}),
    })
    ResponseEntity<Object> findPersonPaginated(@ParameterObject Pageable pageable);


    @GetMapping
    @Operation(summary = "Get all persons from database")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Fetch successful",
                    content = {@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = PersonView.class)))}),
    })
    ResponseEntity<List<PersonView>> findAll();

    @PutMapping
    @Operation(summary = "Update a person")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Update successful",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = PersonView.class))}),
    })
    ResponseEntity<Object> updatePerson(@RequestBody @Valid UpdatePersonDTO personDTO);

}
