package com.api.persons.services;

import com.api.persons.dtos.CreatePersonDTO;
import com.api.persons.models.PersonModel;
import com.api.persons.repositories.PersonRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PersonServiceImpl implements PersonService {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public PersonModel createPerson(CreatePersonDTO person) {
        PersonModel personModel = new PersonModel();
        BeanUtils.copyProperties(person, personModel);

        return personRepository.save(personModel);
    }

    public boolean existsByEmail(String email) {
        return personRepository.existsByEmail(email);
    }

    public Optional<PersonModel> findById(UUID id) {
        return personRepository.findById(id);
    }

    public void deletePerson(UUID id) {
        personRepository.deleteById(id);
    }

    public List<PersonModel> findAll() {
        return personRepository.findAll();
    }

    public PersonModel updatePerson(PersonModel person) {
        return personRepository.save(person);
    }

    public Page<PersonModel> findPaginated(Integer page, Integer size) {
        return personRepository.findAll(PageRequest.of(page, size));
    }

}
