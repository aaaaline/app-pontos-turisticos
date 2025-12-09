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
  "email": "novo@email.com",
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

Obs: role é opcional, padrão é "USER". Valores aceitos: "USER", "ADMIN".  

---

## 2. Pontos Turísticos (`/pontos-turisticos`)

### **Listar Pontos Turísticos**
Retorna todos os pontos cadastrados.  

* **Método:** `GET`
* **URL:** `/pontos-turisticos`
* **Acesso:** Autenticado  

### **Buscar por ID**
Retorna o ponto turístico correspondente ao ID informado.  

* **Método:** `GET`
* **URL:** `/pontos-turisticos/{id}`
* **Acesso:** Autenticado  

### **Criar Ponto Turístico**
Cria um novo ponto turístico.  

* **Método:** `POST`
* **URL:** `/pontos-turisticos`
* **Acesso:** Autenticado  

**Corpo da Requisição (JSON):**
```json
{
  "nome": "Cristo Redentor",
  "descricao": "Estátua art déco de Jesus Cristo...",
  "cidade": "Rio de Janeiro",
  "estado": "RJ",
  "pais": "Brasil",
  "endereco": "Parque Nacional da Tijuca",
  "latitude": -22.9519,
  "longitude": -43.2105,
  "comoChegarTexto": "Pode ir de trem do Corcovado ou van oficial."
}
```

### **Atualizar Ponto Turístico**
Atualiza as informações de um ponto turístico já cadastrado no sistema.  

* **Método:** `PUT`
* **URL:** `/pontos-turisticos/{id}`
* **Acesso:** Autenticado  

### **Deletar Ponto Turístico**
Apaga as informações sobre um ponto turístico cadastrado no sistema.  

* **Método:** `DELETE`
* **URL:** `/pontos-turisticos/{id}`
* **Acesso:** Autenticado  

---

## 3. Fotos e Upload (`/fotos`)

### **Upload de Foto (Vínculo com Ponto)**
Envia o arquivo da imagem para o disco e salva os metadados no banco PostgreSQL.

* **Método:** `POST`
* **URL:** `/fotos/upload/{pontoId}`
* **Acesso:** Autenticado  
* **Content-Typ*e:** `multipart/form-data`

**Parâmetros (Form Data):**  
* **arquivo:** (Arquivo de imagem selecionado)

### **Listar Fotos**
Lista todas as fotos.   

* **Método:** `GET`
* **URL:** `/fotos`
* **Acesso:** Autenticado  

### **Deletar Foto**
Deleta uma foto específica a partir do ID especificado.

* **Método:** `DELETE`
* **URL:** `/fotos/{id}`
* **Acesso:** Autenticado  

---

## 4. Hospedagens (`/hospedagens`)

### **Criar Hospedagem**
Vincula uma hospedagem a um Ponto Turístico existente.

* **Método:** `POST`
* **URL:** `/hospedagens`
* **Acesso:** Autenticado  

**Corpo da Requisição (JSON):**
```json
{
  "nome": "Hotel Central",
  "endereco": "Rua das Flores, 123",
  "precoPorNoite": 250.00,
  "pontoTuristicoId": 1
}
```
### **Listar Hospedagens**
Lista todas as hospedagens cadastradas no sistema.

* **Método:** `GET`
* **URL:** `/hospedagens`
* **Acesso:** Autenticado 

---

## 5. Avaliações (`/avaliacoes`)

### **Enviar ou Editar Avaliação**
Envia uma nota (1-5) e um comentário justificativo. Se o usuário já avaliou o ponto turístico anteriormente, a avaliação será atualizada.  

* **Método:** `POST`
* **URL:** `/avaliacoes`
* **Acesso:** Autenticado  

**Corpo da Requisição (JSON):**
```json
{
  "pontoTuristicoId": "1",
  "nota": 5,
  "comentario": "Excelente local para visitar com a família!"
}
```

Obs: O pontoTuristicoId deve ser o ID (número) do ponto turístico, enviado como string ou número.   

### **Obter Média de Avaliações**
Retorna a média aritmética das notas de um ponto turístico.   

* **Método:** `GET`
* **URL:** `/avaliacoes/media/{pontoId}`
* **Acesso:** Público  

---

## 6. Comentários e Perguntas (`/comentarios`)

### **Criar Comentário**
Publica um novo comentário/pergunta em um ponto turístico.   

* **Método:** `POST`
* **URL:** `/comentarios`
* **Acesso:** Autenticado  

**Corpo da Requisição (JSON):**
```json
{
  "pontoTuristicoId": "1",
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
Remove um comentário pelo seu ID (MongoDB ObjectId).  

* **Método:** `DELETE`
* **URL:** `/comentarios/{id}`
* **Acesso:** Autenticado   

**Regras de Permissão:**
* _USER_: Só pode deletar seus próprios comentários.
* _ADMIN_: Pode deletar qualquer comentário.

---

## 7. Importação e Exportação (`/pontos-turisticos`)

### **Exportar para JSON**

* **Método:** `GET`
* **URL:** `/pontos-turisticos/export/json`
* **Acesso:** Autenticado   

### **Exportar para XML**

* **Método:** `GET`
* **URL:** `/pontos-turisticos/export/xml`
* **Acesso:** Autenticado 

### **Importar de JSON**

* **Método:** `POST`
* **URL:** `/pontos-turisticos/import/json`
* **Acesso:** Autenticado 
* **Content-Type:** `multipart/form-data`
* **Campo:**  arquivo` (arquivo .json)
  
### **Importar de XML**

* **Método:** `POST`
* **URL:** `/pontos-turisticos/import/xml`
* **Acesso:** Autenticado 
* **Content-Type:** `multipart/form-data`
* **Campo:**  arquivo` (arquivo .xml)