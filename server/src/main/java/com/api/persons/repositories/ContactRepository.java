package com.api.persons.repositories;

import com.api.persons.models.ContactModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ContactRepository extends JpaRepository<ContactModel, UUID> {

}
