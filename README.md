# App para crud de pessoas

O app esta totalmente completo e funcional, o código do backend se encontra na pasta 'server' e o frontend na 'client'

O backend foi construido utilizando Spring Boot 3.1.1 e varios frameworks do ecosistema spring e contémm testes unitários e de integração.

O banco de dados utilizado foi o PostgreSQL.

O frontend foi construido utilizando ReactJS 18.2.0 e principalmente a biblioteca de componentes MUI.

Infelizmente não consegui subir o programa na cloud devido a minha falta de tempo por causa do meu trabalho atual.

Para rodar o projeto frontend basta "npm i" e "npm run dev"

Para rodar o projeto backend basta fornecer uma URL e credenciais válidas de conexão a um banco de dados no arquivo /src/main/resources/application.properties

Para rodar os testes de integração também é necessário fornecer uma URL e credenciais válidas válidas de conexão a um banco de dados, porém no diretório /src/test/resources/application-test.properties
