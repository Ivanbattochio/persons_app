package com.api.persons.repositories;

import com.api.persons.models.ContactModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<ContactModel, Integer> {
}
