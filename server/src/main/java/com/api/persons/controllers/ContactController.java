package com.api.persons.controllers;


import com.api.persons.dtos.UpdateContactDTO;
import com.api.persons.view.ContactView;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/contact")
@Tag(name = "Contact API")
public interface ContactController {

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a contact by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Delete successful"),
            @ApiResponse(responseCode = "404",
                    description = "Contact not found"),
    })
    ResponseEntity<Object> deleteContact(@PathVariable(value = "id") UUID id);

    @PutMapping
    @Operation(summary = "Update a contact")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Update successful",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ContactView.class))}),
    })
    ResponseEntity<Object> updateContact(@RequestBody @Valid UpdateContactDTO contactDTO);

}
