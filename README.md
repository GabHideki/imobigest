# ImobiGest

Sistema de gestão imobiliária desenvolvido em Java como projeto acadêmico da disciplina de Programação Orientada a Objetos.

## Funcionalidades

- Autenticação de usuários
- Cadastro e gerenciamento de usuários
- Cadastro e gerenciamento de imóveis
- Cadastro e gerenciamento de contratos

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
imobigest/
│
├── backend/
│   └── src/main/java/br/com/imobigest/
│       ├── controller/
│       ├── model/
│       └── repository/
│
└── frontend/
    ├── css/
    ├── js/
    ├── login.html
    ├── usuario.html
    ├── imovel.html
    ├── contrato.html
    ├── formCliente.html
    ├── formImovel.html
    └── formContrato.html
```

## Como Executar

### Pré-requisitos

Antes de executar o sistema, certifique-se de possuir os seguintes softwares instalados:

- Java JDK 17 ou superior
- Apache Maven 3.9 ou superior
- PostgreSQL 15 ou superior
- pgAdmin 4
- Live Server (VS Code)

### 1. Configuração do Banco de Dados

1. Abra o pgAdmin 4.
2. Conecte-se ao servidor PostgreSQL.
3. Clique com o botão direito em **Databases**.
4. Selecione **Create → Database**.
5. Configure:

```text
Database: imobigest
Owner: postgres
```

6. Clique em **Save**.

---

### 2. Configuração do Backend

Localize o arquivo:

```text
backend/src/main/resources/application.properties
```

Configure os dados do PostgreSQL:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/imobigest
spring.datasource.username=postgres
spring.datasource.password=sua_senha

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

Substitua:

```text
sua_senha
```

pela senha utilizada no PostgreSQL.

---

### 3. Iniciando a API

Abra um terminal na pasta do backend:

```bash
cd backend
```

Compile o projeto:

```bash
mvn clean install
```

Inicie a aplicação:

```bash
mvn spring-boot:run
```

Após a inicialização, a API estará disponível em:

```text
http://localhost:8080
```

---

### 4. Executando o Frontend

1. Abra a pasta `frontend` no VS Code.
2. Clique com o botão direito sobre `login.html`.
3. Selecione **Open with Live Server**.

---

### 5. Login para Testes

```text
Email: admin@imobigest.com
Senha: admin123
```

## Autores

- Gabriel Hideki de Almeida Yamamoto
- Gustavo Vinicius Vieira Cravo
- Ilanna Karolyna da Cunha Piauí Corado
