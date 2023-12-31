package com.api.persons.services;

import com.api.persons.dtos.CreateContactDTO;
import com.api.persons.dtos.CreatePersonDTO;
import com.api.persons.dtos.UpdateContactDTO;
import com.api.persons.dtos.UpdatePersonDTO;
import com.api.persons.models.ContactModel;
import com.api.persons.models.PersonModel;
import com.api.persons.repositories.PersonRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PersonServiceImpl implements PersonService {

    @Autowired
    private PersonRepository personRepository;


    @Override
    public PersonModel createPerson(CreatePersonDTO person) {
        PersonModel personModel = new PersonModel();
        BeanUtils.copyProperties(person, personModel);

        List<CreateContactDTO> contactDTOList = person.getContacts();
        List<ContactModel> contactModelList = new ArrayList<>();

        for (CreateContactDTO contactDTO : contactDTOList) {
            ContactModel contactModel = new ContactModel();
            contactModel.setEmail(contactDTO.getEmail());
            contactModel.setName(contactDTO.getName());
            contactModel.setPhoneNumber(contactDTO.getPhoneNumber());
            contactModel.setPerson(personModel);
            contactModelList.add(contactModel);
        }

        personModel.setContacts(contactModelList);
        return personRepository.save(personModel);
    }

    @Override
    public boolean existsByEmail(String email) {
        return personRepository.existsByEmail(email);
    }

    @Override
    public Optional<PersonModel> findById(UUID id) {
        return personRepository.findById(id);
    }

    @Override
    public void deletePerson(UUID id) {
        personRepository.deleteById(id);
    }

    @Override
    public List<PersonModel> findAll() {
        return personRepository.findAll();
    }

    @Override
    public PersonModel updatePerson(UpdatePersonDTO person) {
        PersonModel personModel = new PersonModel();
        BeanUtils.copyProperties(person, personModel);

        List<UpdateContactDTO> contactDTOList = person.getContacts();
        List<ContactModel> contactModelList = new ArrayList<>();

        for (UpdateContactDTO contactDTO : contactDTOList) {
            ContactModel contactModel = new ContactModel();
            contactModel.setId(contactDTO.getId());
            contactModel.setEmail(contactDTO.getEmail());
            contactModel.setName(contactDTO.getName());
            contactModel.setPhoneNumber(contactDTO.getPhoneNumber());
            contactModel.setPerson(personModel);
            contactModelList.add(contactModel);
        }

        personModel.setContacts(contactModelList);

        return personRepository.save(personModel);
    }

    @Override
    public Page<PersonModel> findPaginated(Integer page, Integer size, Sort sort) {
        return personRepository.findAll(PageRequest.of(page, size).withSort(sort));
    }

    @Override
    public long count() {
        return personRepository.count();
    }

}
