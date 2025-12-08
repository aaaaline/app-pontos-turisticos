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

## Persistência de Dados

O sistema utiliza uma abordagem híbrida, conforme os requisitos da disciplina:  

1. **PostgreSQL (Banco Relacional):**
   - Utilizado para dados estruturados e críticos que exigem integridade referencial e transacional;
   - Tecnologia: Spring Data JPA / Hibernate.

2. **MongoDB (Banco NoSQL Documental):**
   - Utilizado para dados com estrutura flexível e hierárquica;
   - Tecnologia: Spring Data MongoDB.

3. **Redis (Cache/Chave-Valor):**
   - Utilizado para implementação de estratégias de cache (ex: cachear listagem de pontos turísticos mais acessados), visando alta performance.

## Pré-requisitos

Para executar o projeto localmente, é necessário ter instalado:

- Java JDK 17+
- Maven (ou utilizar o wrapper ./mvnw incluso)
- PostgreSQL (rodando na porta 5432)
- MongoDB (rodando na porta 27017)
- Redis (rodando na porta 6379)

## Configuração

Antes de rodar a aplicação, verifique o arquivo `src/main/resources/application.properties`.

1. **Banco de Dados PostgreSQL**

Crie um banco de dados chamado _bd_turismo_, em seu PostgreSQL, ou altere a URL de conexão:  

```
spring.datasource.url=jdbc:postgresql://localhost:5432/bd_turismo
spring.datasource.username=postgres
spring.datasource.password=123456
```

2. **JWT Secret**

A chave secreta para assinatura dos tokens está definida na propriedade abaixo (para produção, utilize variáveis de ambiente):  

```
api.security.token.secret=LTcvOgi6eY7lLHIuSJXBVL07ikGpK2xbIC4qiPA6aqqZQ8dsH8vAZw6wUXOKPPmy
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

Para detalhes sobre os endpoints e corpos de requisição (JSON), consulte o arquivo [Endpoints - Sistema Web sobre Turismo/Viagens](https://github.com/aaaaline/app-pontos-turisticos/blob/main/docs/endpoints.md)) neste repositório.
