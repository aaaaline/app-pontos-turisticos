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

### **Listar Pontos Turísticos (Com Filtros)**
Retorna os pontos cadastrados com paginação e filtros opcionais.   

* **Método:** `GET`
* **URL:** `/pontos-turisticos`
* Parâmetros de Consulta (Query Params - Opcionais):
     - `nome`: Filtra por parte do nome.
     - `cidade`: Filtra por cidade.
     - `estado`: Filtra por estado.
     - `tipo`: Filtra por tipo de atração.
     - `mediaMinima`: Retorna apenas pontos com média de avaliação maior ou igual ao valor.
     - `page`: Número da página (padrão 0).
     - `size`: Itens por página (padrão 10).
     - `sort`: Ordenação (ex: nome,asc).
* **Acesso:** Público 

### **Buscar por ID**
Retorna o ponto turístico correspondente ao ID informado.  

* **Método:** `GET`
* **URL:** `/pontos-turisticos/{id}`
* **Acesso:** Público  

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
  "comoChegarTexto": "Pode ir de trem do Corcovado ou van oficial.",
  "tipo": "Monumento"
}
```

### **Atualizar Ponto Turístico**
Atualiza as informações de um ponto turístico.  

* **Método:** `PUT`
* **URL:** `/pontos-turisticos/{id}`
* **Acesso:** Autenticado  

### **Deletar Ponto Turístico**
Apaga as informações sobre um ponto turístico cadastrado no sistema.  

* **Método:** `DELETE`
* **URL:** `/pontos-turisticos/{id}`
* **Acesso:** Autenticado  

---

## 3. Favoritos (`/favoritos`)

### **Alternar Favorito (Toggle)**
Adiciona aos favoritos se não existir, ou remove se já existir.  

* **Método:** `POST`
* **URL:** `/favoritos/{pontoId}`
* **Acesso:** Autenticado  

### **Listar Favoritos**
Lista todos os favoritos do usuário logado.  

* **Método:** `GET`
* **URL:** `/favoritos`
* **Acesso:** Autenticado  

---

## 4. Fotos (`/fotos`)

### **Upload de Foto (Arquivo)**
Envia o arquivo da imagem para o disco e salva os metadados no banco.  

* **Método:** `POST`
* **URL:** `/fotos/upload/{pontoId}`
* **Acesso:** Autenticado  
* **Content-Typ*e:** `multipart/form-data`
* **Campo:** `arquivo` (Arquivo de imagem)

### **Listar Fotos**
Lista todas as fotos cadastradas (metadados).  

* **Método:** `GET`
* **URL:** `/fotos`
* **Acesso:** Autenticado

### **Buscar Foto por ID**

* **Método:** `GET`
* **URL:** `/fotos/{id}`
* **Acesso:** Autenticado

### **Atualizar Dados da Foto**

* **Método:** `PUT`
* **URL:** `/fotos/{id}`
* **Acesso:** Autenticado

**Corpo da Requisição (JSON):**
```
{
  "descricao": "Nova descrição da foto"
}
```

### **Deletar Foto**
Deleta uma foto específica a partir do ID especificado.

* **Método:** `DELETE`
* **URL:** `/fotos/{id}`
* **Acesso:** Autenticado  

---

## 5. Hospedagens (`/hospedagens`)

### **Criar Hospedagem**
Vincula uma hospedagem a um Ponto Turístico existente.

* **Método:** `POST`
* **URL:** `/hospedagens`
* **Acesso:** Autenticado  

**Corpo da Requisição (JSON):**
```
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
* **Acesso:** Público

### **Buscar Hospedagem por ID**
Retorna as informações da hospedagem correspondente ao ID informado.  

* **Método:** `GET`
* **URL:** `/hospedagens/{id}`
* **Acesso:** Público

### **Atualizar Hospedagem**
Atualiza as informações de uma hospedagem.

* **Método:** `PUT`
* **URL:** `/hospedagens/{id}`
* **Acesso:** Autenticado

### **Deletar Hospedagem**
Deleta as informações de uma hospedagem.

* **Método:** `DELETE`
* **URL:** `/hospedagens/{id}`
* **Acesso:** Autenticado

---

## 6. Avaliações (`/avaliacoes`)

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

## 7. Comentários e Perguntas (`/comentarios`)

### **Criar Comentário**
Publica um novo comentário/pergunta em um ponto turístico.   

* **Método:** `POST`
* **URL:** `/comentarios`
* **Acesso:** Autenticado  

**Corpo da Requisição (JSON):**
```json
{
  "pontoTuristicoId": "1",
  "texto": "Qual o horário de funcionamento?",
  "metadata": {
      "device": "mobile"
  }
}
```

### **Listar Comentários**
Lista todos os comentários de um ponto turístico, ordenados do mais recente para o mais antigo.

* **Método:** `GET`
* **URL:** `/comentarios/{pontoId}`
* **Acesso:** Público

### **Atualizar Comentário**
O usuário só pode atualizar seus próprios comentários.  

* **Método:** `PUT`
* **URL:** `/comentarios/{id}`
* **Acesso:** Autenticado (Dono do comentário)

**Corpo da Requisição (JSON):**
```
{
  "texto": "Texto corrigido."
}
```

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
* **Acesso:** Autenticado (Dono ou Admin) 

---

## 8. Importação e Exportação (`/pontos-turisticos`)

### **Exportar para JSON**

* **Método:** `GET`
* **URL:** `/pontos-turisticos/export/json`

### **Exportar para XML**

* **Método:** `GET`
* **URL:** `/pontos-turisticos/export/xml`
* **Acesso:** Autenticado 

### **Importar de JSON**

* **Método:** `POST`
* **URL:** `/pontos-turisticos/import/json`
* **Acesso:** Autenticado 
* **Content-Type:** `multipart/form-data`
* **Campo:**  `arquivo` (arquivo .json)
  
### **Importar de XML**

* **Método:** `POST`
* **URL:** `/pontos-turisticos/import/xml`
* **Acesso:** Autenticado 
* **Content-Type:** `multipart/form-data`
* **Campo:**  `arquivo` (arquivo .xml)
