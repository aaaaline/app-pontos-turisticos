# Sistema de Turismo - Frontend

## Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias modernas de desenvolvimento web:

### Core & Framework
- **React 19:** Biblioteca JavaScript para construção de interfaces;
- **Vite 7:** Ferramenta de build rápida e moderna;
- **React Router DOM 7:** Roteamento client-side;
- **Axios:** Cliente HTTP para comunicação com a API;
- **Lucide React:** Biblioteca de ícones.

### Estilização
- **CSS Modules:** Estilização com variáveis CSS customizadas;
- **Design System Próprio:** Sistema de cores e componentes reutilizáveis.

### Estrutura
- **Context API:** Gerenciamento de estado global (autenticação);
- **Hooks Personalizados:** Lógica reutilizável;
- **Componentização:** Componentes modulares e reutilizáveis.

## Pré-requisitos

Para executar o projeto localmente, é necessário ter instalado:

- Node.js (versão 20 ou superior)
- npm ou yarn
- Backend rodando em `http://localhost:8080` (veja [README do Backend](../backend-app-pontos-turisticos/readme.md))

## Configuração

Antes de rodar a aplicação, verifique o arquivo `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080';
```

Se o backend estiver rodando em outra porta ou endereço, ajuste esta variável.

## Como Executar

1. Vá para a pasta do frontend:

```bash
cd app-pontos-turisticos/frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Execute a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:5173`

## Funcionalidades Implementadas

### Autenticação
- Login e registro de usuários
- Gerenciamento de sessão com localStorage
- Proteção de rotas para usuários autenticados
- Diferenciação de permissões (USER e ADMIN)

### Pontos Turísticos
- Listagem paginada com busca e filtros
- Visualização detalhada de pontos
- Criação, edição e exclusão (requer autenticação)
- Sistema de avaliações (1-5 estrelas)
- Sistema de comentários

### Hospedagens
- Listagem de hospedagens próximas
- Cadastro e gerenciamento de hospedagens
- Informações de contato e preços

### Admin
- Exportação de dados (JSON/XML)
- Importação de dados (JSON/XML)
- Gerenciamento completo do sistema


Todas as chamadas de API estão centralizadas em `src/services/api.js`.

## Navegadores Suportados

- Chrome (última versão)
- Firefox (última versão)
- Safari (última versão)
- Edge (última versão)
