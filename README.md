# AssistTech - Padrões de Projeto

O **AssistTech** é uma aplicação web para abertura e gerenciamento de chamados de suporte técnico.  
O projeto foi desenvolvido como trabalho acadêmico da disciplina de **Padrões de Projeto**, com foco na aplicação prática dos padrões **Factory Method** e **State**.

## 📌 Sobre o projeto

O sistema tem como objetivo permitir que usuários registrem chamados de TI e acompanhem o andamento dos atendimentos. A aplicação possui uma interface administrativa moderna para visualização de métricas, listagem de chamados, cadastro de usuários, cadastro de técnicos e relatórios.

Atualmente, o repositório contém a parte de **front-end** da aplicação, desenvolvida com React e Vite. O back-end será desenvolvido separadamente com Java Spring Boot.

## 🚀 Funcionalidades

- Dashboard com visão geral dos chamados
- Cards de métricas
- Gráficos de chamados por status
- Gráficos de chamados por categoria
- Listagem de chamados
- Tela de criação de novo chamado
- Tela de detalhes do chamado
- Cadastro e listagem de usuários
- Cadastro e listagem de técnicos
- Página de relatórios
- Interface responsiva
- Dados mockados para simulação visual

## 🧩 Padrões de Projeto

Este projeto utiliza como base dois padrões de projeto principais:

### Factory Method

**Tipo:** Padrão Criacional

O padrão **Factory Method** será aplicado na criação dos chamados de acordo com sua categoria.

Exemplo de categorias:

- Hardware
- Software
- Rede
- Acesso

A ideia é centralizar a criação dos chamados em uma fábrica, evitando que a lógica de criação fique espalhada pelo sistema.

### State

**Tipo:** Padrão Comportamental

O padrão **State** será aplicado no controle de status dos chamados.

Fluxo esperado:

```text
ABERTO -> EM_ATENDIMENTO -> RESOLVIDO -> FECHADO
````

Cada estado terá sua própria regra de transição, deixando o código mais organizado e evitando excesso de condicionais.

## 🛠️ Tecnologias utilizadas

### Front-end

* React
* Vite
* JavaScript
* React Router DOM
* Axios
* Lucide React
* Recharts
* CSS

### Back-end planejado

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* H2 Database ou PostgreSQL
* Bean Validation

## 📁 Estrutura atual do projeto

```text
AssistTech-Padroes-de-Projeto/
│
├── front-end/
│   │
│   ├── public/
│   │   └── assets/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
├── LICENSE
└── README.md
```

## 📄 Páginas do front-end

O front-end possui as seguintes páginas principais:

```text
src/pages/
│
├── Dashboard.jsx
├── Chamados.jsx
├── DetalhesChamado.jsx
├── NovoChamado.jsx
├── Relatorios.jsx
├── Tecnicos.jsx
└── Usuarios.jsx
```

## ▶️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Harlen539/AssistTech-Padroes-de-Projeto.git
```

### 2. Acesse a branch developers

```bash
cd AssistTech-Padroes-de-Projeto
git checkout developers
```

### 3. Acesse a pasta do front-end

```bash
cd front-end
```

### 4. Instale as dependências

```bash
npm install
```

### 5. Execute o projeto

```bash
npm run dev
```

Depois, acesse o endereço exibido no terminal, geralmente:

```text
http://localhost:5173
```

## 📦 Scripts disponíveis

```bash
npm run dev
```

Executa o projeto em ambiente de desenvolvimento.

```bash
npm run build
```

Gera a versão de produção.

```bash
npm run preview
```

Executa uma prévia da versão de produção.

## 🔗 Integração com API

O front-end foi preparado para consumir futuramente uma API REST.

Endpoints planejados:

```text
GET    /api/chamados
GET    /api/chamados/{id}
POST   /api/chamados
PUT    /api/chamados/{id}/status

GET    /api/usuarios
POST   /api/usuarios

GET    /api/tecnicos
POST   /api/tecnicos
```

Enquanto o back-end não estiver pronto, o sistema pode utilizar dados mockados para simulação visual.

## 🎨 Identidade visual

O projeto utiliza uma identidade visual moderna, com foco em uma interface administrativa limpa e profissional.

Principais características:

* Sidebar azul escura
* Cards brancos com bordas arredondadas
* Botões em azul vibrante
* Gráficos com cores por status
* Badges de prioridade e status
* Layout responsivo
* Visual inspirado em sistemas SaaS administrativos

## 📜 Licença

Este projeto está licenciado sob a licença MIT.

[1]: https://github.com/Harlen539/AssistTech-Padroes-de-Projeto/tree/developers "GitHub - Harlen539/AssistTech-Padroes-de-Projeto at developers · GitHub"
[2]: https://github.com/Harlen539/AssistTech-Padroes-de-Projeto/tree/developers/front-end "AssistTech-Padroes-de-Projeto/front-end at developers · Harlen539/AssistTech-Padroes-de-Projeto · GitHub"
[3]: https://raw.githubusercontent.com/Harlen539/AssistTech-Padroes-de-Projeto/developers/front-end/package.json "raw.githubusercontent.com"
