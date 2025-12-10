# Sistema de Turismo - Backend API

## Tecnologias Utilizadas

O projeto foi construído utilizando Java 17 e Spring Boot, com a seguinte stack de tecnologias:  

### Core & Framework
- **Java 17:** Linguagem de programação;
- **Spring Boot 3:** Framework principal;
- **Spring Security:** Gerenciamento de autenticação e autorização;
- **JWT (JSON Web Token):** Padrão para autenticação stateless (via biblioteca java-jwt da Auth0);
- **Lombok:** Redução de código boilerplate;
- **Maven:** Gerenciamento de dependências e build.

### Persistência de Dados

O sistema utiliza uma abordagem híbrida, conforme os requisitos da disciplina:  

1. **PostgreSQL:** Dados relacionais (Usuários, Pontos Turísticos, Hospedagens, Favoritos).
2. **MongoDB:** Dados não relacionais (Comentários, Fotos/Metadados).
3. **Redis:** Cache distribuído para performance (ex: cache de pontos turísticos).
   
## Pré-requisitos

Para executar o projeto localmente, é necessário ter instalado:

- Java JDK 17+
- Maven (ou utilizar o wrapper ./mvnw incluso)
- Docker e Docker Compose (Recomendado para subir os bancos de dados)

## Configuração

Antes de rodar a aplicação, verifique o arquivo `src/main/resources/application.properties`.

1. **Subir os Bancos de Dados (Via Docker)**

O projeto já inclui um arquivo `docker-compose.yml` que configura o PostgreSQL, MongoDB e Redis.  

Na pasta raiz do projeto (onde está o `docker-compose.yml`), execute:  

```
docker-compose up -d
```
Isso iniciará os containers:  
* **Postgres:** Porta 5432 (User: postgres, Pass: 123456, DB: bd_turismo)
* **MongoDB:** Porta 27017
* **Redis:** Porta 6379

2. **Verificar Configurações**

O arquivo `src/main/resources/application.properties` já está configurado para conectar nestes serviços locais:  

```
spring.datasource.url=jdbc:postgresql://localhost:5432/bd_turismo  
spring.datasource.username=postgres  
spring.datasource.password=123456  

spring.data.mongodb.host=localhost  
spring.data.mongodb.port=27017  

spring.data.redis.host=localhost  
spring.data.redis.port=6379  
```

## Como Executar

1. Clone o repositório:  

```
git clone https://github.com/aaaaline/app-pontos-turisticos.git
cd app-pontos-turisticos/backend-app-pontos-turisticos
```

2. Instale as dependências e compile:  

```
./mvnw clean install
```

3. Execute a aplicação:  

```
./mvnw spring-boot:run
```

A aplicação estará disponível em: `http://localhost:8080`.  

## Documentação da API

Para detalhes sobre os endpoints e corpos de requisição (JSON), consulte o arquivo [Endpoints - Sistema Web sobre Turismo/Viagens](https://github.com/aaaaline/app-pontos-turisticos/blob/main/docs/endpoints.md) neste repositório.
