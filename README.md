# ImobiGest

Sistema de gestão imobiliária desenvolvido em Java como projeto acadêmico da disciplina de Programação Orientada a Objetos.

## Funcionalidades

- Login de Usuarios
- Gerenciamento de usuários
- Gerenciamento de imóveis
- Gerenciamento de contratos

## Tecnologias Utilizadas

### Backend
- Java
- Maven
- Spring Boot
- PostgreSQL
- Lombok
- Git e GitHub
- Programação Orientada a Objetos (POO)

### Frontend
 - HTML
 - CSS
 - JavaScript

## Estrutura do Projeto

```text
src/main/java/br/com/imobigest
├── controller
├── model
└── repository
```
```text
imobigest
├── backend
│   ├── src/main/java/br/com/imobigest
│   │   ├── controller
│   │   ├── model
│   │   └── repository
│   │
└── frontend
│   ├── js
│   ├── css
│   └── 
```


## Como Executar

### Pré-requisitos

Antes de executar o sistema, certifique-se de possuir os seguintes softwares instalados:
- Java JDK 17 ou superior
- Apache Maven 3.9 ou superior
- PostgreSQL 15 ou superior
- pgAdmin 4
- Live Server

1. Configuração do Banco de Dados
   - Abra o pgAdmin4
   - Conecte-se ao servidor PostgreSQL
   - Clique com o botão direito em Databases
   - Selecione: Create -> Database
   - Coloque:
     - Database: imobigest
     - Owner: postgres
    - Clique em Save
2. Configuração do Backend\n
  - Localize o arquivo:
```text
backend/src/main/resources/application.properties
```
  - Insira sua senha no campo "spring.datasource.password=" (Senha utilizada no pgAdmin4)
  - Configure os dados do PostgreSQL:
  ```text
  spring.datasource.url=jdbc:postgresql://localhost:5432/imobigest
spring.datasource.username=postgres
spring.datasource.password=sua_senha

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
  ```
3. Iniciar API
```bash
cd backend
mvn clean installmvn
spring-boot:run
```

4. Execução do Frontend
- Acesse a pasta frontend e abra qualquer página utilizando o Live Server

5. Login Padrão para Testes
- Email: admin@imobigest.com
- Senha: admin123

## Autores

- Gabriel Hideki de Almeida Yamamoto
- Gustavo Vinicius Vieira Cravo
- Ilanna Karolyna da Cunha Piauí Corado
