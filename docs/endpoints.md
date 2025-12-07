# Endpoints - Sistema Web sobre Turismo/Viagens

**Base URL:** `http://localhost:8080`  
**Content-Type:** `application/json`

---

## Autenticação e Segurança

A maioria dos endpoints de escrita (POST, DELETE) exige autenticação via Token JWT.  

* **Header Obrigatório (para rotas protegidas):**
    * **Key:** `Authorization`
    * **Value:** `Bearer <SEU_TOKEN_JWT>`

---

## 1. Autenticação (`/auth`)

### **Login**
Realiza a autenticação do usuário e retorna o token JWT.

* **Método:** `POST`
* **URL:** `/auth/login`
* **Acesso:** Público

**Corpo da Requisição (JSON):**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

### **Registrar Usuário**
Cria uma nova conta no sistema.  

* **Método:** `POST`
* **URL:** `/auth/register`
* **Acesso:** Público

**Corpo da Requisição (JSON):**
```json
{
  "name": "Nome Completo",
  "email": "novo@email.com",
  "password": "senha123",
  "role": "USER"
}
```
---

## 2. Avaliações (`/avaliacoes`)

### **Enviar ou Editar Avaliação**
Envia uma nota (1-5) e um comentário justificativo. Se o usuário já avaliou o ponto turístico anteriormente, a avaliação será atualizada.  

* **Método:** `POST`
* **URL:** `/avaliacoes`
* **Acesso:** Autenticado  

**Corpo da Requisição (JSON):**
```json
{
  "pontoTuristicoId": "uuid-do-ponto-turistico",
  "nota": 5,
  "comentario": "Excelente local para visitar com a família!"
}
```

### **Obter Média de Avaliações**
Retorna a média aritmética das notas de um ponto turístico.   

* **Método:** `GET`
* **URL:** `/avaliacoes/media/{pontoId}`
* **Acesso:** Público  

---

## 3. Comentários (`/comentarios`)

### **Criar Comentário**
Publica um novo comentário em um ponto turístico.   

* **Método:** `POST`
* **URL:** `/comentarios`
* **Acesso:** Autenticado  

**Corpo da Requisição (JSON):**
```json
{
  "pontoTuristicoId": "uuid-do-ponto-turistico",
  "texto": "Alguém sabe o horário de funcionamento?",
  "metadata": {
      "device": "mobile",
      "os": "android"
  }
}
```

### **Listar Comentários**
Lista todos os comentários de um ponto turístico, ordenados do mais recente para o mais antigo.

* **Método:** `GET`
* **URL:** `/comentarios/{pontoId}`
* **Acesso:** Público  

### **Responder a um Comentário**
Adiciona uma resposta a um comentário existente.

* **Método:** `POST`
* **URL:** `/comentarios/{id}/responder`
* **Acesso:** Autenticado   

**Corpo da Requisição (JSON):**
```json
{
  "texto": "Abre todos os dias às 08h."
}
```

### **Deletar Comentário**
Remove um comentário pelo seu ID (MongoDB ID).  

* **Método:** `DELETE`
* **URL:** `/comentarios/{id}`
* **Acesso:** Autenticado   

**Regras de Permissão:**
* _USER_: Só pode deletar seus próprios comentários.
* _ADMIN_: Pode deletar qualquer comentário.