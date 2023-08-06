package com.api.persons;


import com.api.persons.dtos.CreateContactDTO;
import com.api.persons.dtos.CreatePersonDTO;
import com.api.persons.dtos.UpdatePersonDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@TestPropertySource("/application-test.properties")
@AutoConfigureMockMvc
@SpringBootTest
@Transactional
public class PersonControllerTest {

    public static final MediaType APPLICATION_JSON_UTF8 = MediaType.APPLICATION_JSON;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private MockMvc mockMvc;

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
    public void getAllPersonsHttpRequest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/person"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void getAllPersonsPaginatedHttpRequest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/person/paginated")
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("page", "0")
                        .param("size", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));

        mockMvc.perform(MockMvcRequestBuilders.get("/person/paginated")
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("page", "0")
                        .param("size", "20"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void createAValidPersonHttpRequest() throws Exception {
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

        String serializedJsonObject = objectMapper.writeValueAsString(personDTO);

        mockMvc.perform(post("/person")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(serializedJsonObject))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.name", is("mock")))
                .andExpect(jsonPath("$.email", is("mock@gmail.com")))
                .andExpect(jsonPath("$.ein", is("51326686828")))
                .andExpect(jsonPath("$.contacts", hasSize(1)));
    }

    @Test
    public void createAnInvalidPersonHttpRequest() throws Exception {
        CreatePersonDTO personDTO = new CreatePersonDTO();
        personDTO.setEin("51326686828");
        personDTO.setBirthDate(Instant.now());
        personDTO.setName("mock");
        personDTO.setEmail("mock@gmail.com");

        String serializedJsonObject = objectMapper.writeValueAsString(personDTO);

        mockMvc.perform(post("/person")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(serializedJsonObject))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", is("contacts field is missing!")))
                .andExpect(jsonPath("$.field", is("contacts")))
                .andExpect(jsonPath("$.statusCode", is(400)));
    }

    @Test
    public void updatePersonHttpRequest() throws Exception {

        UpdatePersonDTO updatePersonDTO = new UpdatePersonDTO();
        updatePersonDTO.setId(UUID.fromString("df031153-546a-4d31-a92c-c9d53a88056c"));
        updatePersonDTO.setName("ivan-updated");

        String serializedJsonObject = objectMapper.writeValueAsString(updatePersonDTO);

        mockMvc.perform(put("/person")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(serializedJsonObject))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("ivan-updated")));
    }

    @Test
    public void updatePersonInvalidHttpRequest() throws Exception {

        UpdatePersonDTO updatePersonDTO = new UpdatePersonDTO();
        updatePersonDTO.setId(UUID.fromString("df031153-546a-4d31-a92c-c9d53a88056c"));
        updatePersonDTO.setEmail("invalidEmail");

        String serializedJsonObject = objectMapper.writeValueAsString(updatePersonDTO);

        mockMvc.perform(put("/person")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(serializedJsonObject))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", is("Invalid email!")))
                .andExpect(jsonPath("$.field", is("email")))
                .andExpect(jsonPath("$.statusCode", is(400)));
    }

    @Test
    public void deletePersonValidHttpRequest() throws Exception {
        mockMvc.perform(delete("/person/{id}", "df031153-546a-4d31-a92c-c9d53a88056c")
                )
                .andExpect(status().isOk());
    }


}
