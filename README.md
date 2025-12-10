# TurisMap - Sistema de Gestão de Pontos Turísticos

Este projeto é um sistema web completo (Fullstack) desenvolvido como Trabalho Final da disciplina de Software para Persistência de Dados do Instituto de Informática (UFG).

Integrantes do grupo:
- Aline Lima Martins Coelho
- Raquel Dias da Silva
- Taniele Rocha Madureira

## Sobre o Projeto

O TurisMap permite que usuários cadastrem, consultem e avaliem pontos turísticos. Além disso, há suporte para upload de fotos, comentários, gestão de hospedagens e funcionalidades de importação/exportação de dados.

### Arquitetura de Persistência Híbrida

Conforme os requisitos da disciplina, o sistema utiliza três tecnologias de armazenamento distintas:

1. **PostgreSQL (Relacional):**
     - Armazena dados estruturados e críticos que exigem integridade referencial;
     - Entidades: Usuários, Pontos Turísticos, Hospedagens, Favoritos e Avaliações (nota).

2. **MongoDB (NoSQL Documental):**
    - Utilizado para dados volumosos, flexíveis ou metadados;
    - Coleções: Comentários (com respostas aninhadas) e Metadados das Fotos.

3. **Redis (Cache Key-Value):**
    - Implementado para otimizar a performance de leitura;
    - Uso: Cache de consulta de pontos turísticos (findById) para reduzir a carga no banco relacional em acessos frequentes.

### Funcionalidades: 

As principais funcionalidades da aplicação incluem:   

- **Autenticação e Segurança:** Login e registro de usuários com JWT (JSON Web Token). Controle de permissões (USER vs ADMIN);
- **CRUD de Pontos Turísticos:** Cadastro completo com geolocalização (latitude/longitude), endereço e descrições;
- **Gestão de Fotos:** Upload de múltiplas fotos por ponto turístico (armazenamento em disco local e metadados no MongoDB);
- **Interação Social:**
   - Avaliação com nota (1 a 5 estrelas);
   - Comentários e respostas;
   - Favoritar pontos turísticos.
- **Hospedagens:** Vínculo de hotéis/pousadas próximos aos pontos turísticos;
- **Importação e Exportação:** Suporte para exportar e importar dados dos pontos turísticos em formatos JSON, XML e CSV.

## Tecnologias Utilizadas

### Backend:

- **Linguagem:** Java 17
- **Framework:** Spring Boot 3
- **Segurança:** Spring Security + Java JWT (Auth0)
- **Dados:** Spring Data JPA, Spring Data MongoDB, Spring Data Redis
- **Utilitários:** Lombok, Jackson (JSON/XML)

### Frontend:

- **Framework:** React 19 + Vite
- **Roteamento:** React Router DOM 7
- **HTTP Client:** Axios
- **Estilização:** CSS Modules + Lucide React (Ícones)

### Infraestrutura:

- **Docker Compose:** Orquestração dos bancos de dados.

## Como Executar o Projeto

### Pré-requisitos:

- Docker e Docker Compose instalados
- Node.js (v18+) e npm
- Java JDK 17+ (opcional se usar o wrapper maven incluso)

### Execução:

**Passo 1:** Subir a Infraestrutura (Bancos de Dados)   

Navegue até a pasta raiz onde está o arquivo `docker-compose.yml` e execute:

```
docker-compose up -d
```

Isso iniciará os containers:
- PostgreSQL (Porta 5432)
- MongoDB (Porta 27017)
- Redis (Porta 6379)

**Passo 2:** Executar o Backend   

Acesse a pasta do backend:  

```
cd backend-app-pontos-turisticos
```

Instale as dependências e execute:

```
./mvnw clean spring-boot:run
```

O backend rodará em `http://localhost:8080`.

**Passo 2:** Executar o Frontend

Acesse a pasta do frontend:  

```
cd ../frontend
```

Instale as dependências:  

```
npm install
```

Inicie o servidor de desenvolvimento:   

```
npm run dev
```

O frontend rodará em `http://localhost:5173`.

## Documentação Complementar

A documentação detalhada dos endpoints, incluindo exemplos de JSON para requisições, está disponível em: [endpoints.md](https://github.com/aaaaline/app-pontos-turisticos/blob/main/docs/endpoints.md)
