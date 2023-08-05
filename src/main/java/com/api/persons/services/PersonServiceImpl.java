package com.api.persons.services;

import com.api.persons.dtos.CreatePersonDTO;
import com.api.persons.models.PersonModel;
import com.api.persons.repositories.PersonRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PersonServiceImpl implements PersonService {

    @Autowired
    private PersonRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public PersonModel createPerson(CreatePersonDTO person) {
        PersonModel personModel = new PersonModel();
        BeanUtils.copyProperties(person, personModel);

        return userRepository.save(personModel);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public Optional<PersonModel> findById(UUID id) {
        return userRepository.findById(id);
    }

    public void deletePerson(UUID id) {
        userRepository.deleteById(id);
    }

    public List<PersonModel> findAll() {
        return userRepository.findAll();
    }

    public PersonModel updatePerson(PersonModel person) {
        return userRepository.save(person);
    }
}
