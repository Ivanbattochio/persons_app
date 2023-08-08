package com.api.persons;

import com.api.persons.dtos.CreateContactDTO;
import com.api.persons.dtos.CreatePersonDTO;
import com.api.persons.models.PersonModel;
import com.api.persons.services.PersonServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.TestPropertySource;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@TestPropertySource("/application-unit-test.properties")
public class PersonServiceTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private PersonServiceImpl personService;

    @BeforeEach
    public void beforeEach() {
        jdbcTemplate.execute("INSERT INTO tb_person (id, name, email, birth_date, ein) VALUES ('df031153-546a-4d31-a92c-c9d53a88056c', 'John Doe', 'ivan@outlook.com', '1990-01-01', '51326686828')");
        jdbcTemplate.execute("INSERT INTO tb_person (id, name, email, birth_date, ein) VALUES ('df031153-546a-4d31-a92c-c9d53a88456c', 'John Doe', 'ivan123@outlook.com', '1990-01-01', '51326686828')");
    }

    @AfterEach
    public void afterEach() {
        jdbcTemplate.execute("DELETE FROM tb_contact");
        jdbcTemplate.execute("DELETE FROM tb_person");
    }

    @Test
    public void whenCreatingPersonGivenAValidInputShouldCreateAPerson() {
        CreatePersonDTO personDTO = new CreatePersonDTO();
        personDTO.setEin("51326686828");
        personDTO.setBirthDate(Instant.now());
        personDTO.setName("mock");
        personDTO.setEmail("mock@gmail.com");
        List<CreateContactDTO> contacts = new ArrayList<>();
        CreateContactDTO contact = new CreateContactDTO();
        contact.setName("nmock");
        contact.setPhoneNumber("12222");
        contact.setEmail("aaa@gmail.com");
        contacts.add(contact);
        personDTO.setContacts(contacts);

        PersonModel createdPerson = personService.createPerson(personDTO);

        assertNotNull(createdPerson.getId(), "creating a valid person should return its Model");
    }

    @Test
    public void whenCreatingPersonGivenAnInvalidInputShouldThrowError() {

        CreatePersonDTO personDTO = new CreatePersonDTO();
        personDTO.setEin("51326686828");
        personDTO.setBirthDate(Instant.now());
        personDTO.setName("mock");
        List<CreateContactDTO> contacts = new ArrayList<>();
        CreateContactDTO contact = new CreateContactDTO();
        contact.setName("nmock");
        contact.setPhoneNumber("12222");
        contact.setEmail("aaa@gmail.co");
        contacts.add(contact);
        personDTO.setContacts(contacts);

        assertThrows(Exception.class, () -> personService.createPerson(personDTO), "creating a person with invalid email should throw error");
    }

    @Test
    public void whenDeletingPersonByIDGivenAnValidInputShouldDelete() {
        personService.deletePerson(UUID.fromString("df031153-546a-4d31-a92c-c9d53a88056c"));
        PersonModel personModel = personService.findById(UUID.fromString("df031153-546a-4d31-a92c-c9d53a88056c")).orElse(null);

        assertNull(personModel, "deleted person should not be found");
    }

    @Test
    public void whenGettingPaginatedPersonsGivenAnValidInputShouldReturnArrayOfTwo() {
        Page<PersonModel> page = personService.findPaginated(0, 20, Sort.by(Sort.Order.asc("name")));

        assertEquals(2, page.getTotalElements(), "page length should be equal to two");
    }

    @Test
    public void whenGettingAllPersonsGivenAnValidInputShouldReturnArrayOfTwo() {
        List<PersonModel> personModelList = personService.findAll();

        assertEquals(2, personModelList.size(), "list length should be equal to two");
    }

    @Test
    public void whenExistsByEmailGivenAnValidInputShouldReturnTrue() {
        boolean exists = personService.existsByEmail("ivan@outlook.com");

        assertTrue(exists, "person should exist");
    }

    @Test
    public void whenExistsByEmailGivenAnInvalidInputShouldReturnFalse() {
        boolean exists = personService.existsByEmail("ivannn@hotmail.com");

        assertFalse(exists, "person should not exist");
    }

    @Test
    public void whenUpdatingPersonsGivenAnValidInputShouldReturnUpdatedPersonFields() {
        PersonModel personModel = personService.findById(UUID.fromString("df031153-546a-4d31-a92c-c9d53a88056c")).orElse(null);

        assertNotNull(personModel, "person should be found");


        personModel.setName("lucas");

        PersonModel updatedPerson = personService.updatePerson(personModel);

        String expectedNameAfterUpdate = "lucas";

        assertEquals(expectedNameAfterUpdate, updatedPerson.getName(), "updated person name should be lucas");
    }


    @Test
    public void whenGettingAPersonGivenAnValidInputShouldReturnThePersonModel() {
        PersonModel personModel = personService.findById(UUID.fromString("df031153-546a-4d31-a92c-c9d53a88056c")).orElse(null);

        assertNotNull(personModel, "person should be found");
    }

}
