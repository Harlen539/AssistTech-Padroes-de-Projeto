# AssistTech — Sistema de Chamados com Padrões de Projeto

<div align="left">

![Status](https://img.shields.io/badge/Status-Online-20232A?style=flat-square&labelColor=20232A&color=22C55E)
![React](https://img.shields.io/badge/React-18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-6-20232A?style=flat-square&logo=vite&logoColor=646CFF)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-20232A?style=flat-square&logo=javascript&logoColor=F7DF1E)
![CSS3](https://img.shields.io/badge/CSS3-20232A?style=flat-square&logo=css3&logoColor=1572B6)
![Node.js](https://img.shields.io/badge/Node.js-20232A?style=flat-square&logo=node.js&logoColor=339933)
![Express](https://img.shields.io/badge/Express-20232A?style=flat-square&logo=express&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-20232A?style=flat-square&logo=openai&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-20232A?style=flat-square&labelColor=20232A&color=2563EB)

</div>
---

## 📖 Sobre o projeto

O **AssistTech** é uma aplicação web full-stack desenvolvida para gerenciamento de chamados de suporte técnico.

O sistema permite que usuários registrem solicitações de suporte, técnicos acompanhem os atendimentos e a equipe responsável gerencie o fluxo dos chamados de forma organizada.

Além da proposta funcional, o projeto também foi desenvolvido com foco acadêmico e técnico para demonstrar a aplicação prática de **Padrões de Projeto** em uma aplicação real, utilizando principalmente os padrões **Factory Method** e **State**.

---

## 📚 Sumário

* [Sobre o projeto](#-sobre-o-projeto)
* [Objetivo](#-objetivo)
* [Funcionalidades](#-funcionalidades)
* [Tecnologias utilizadas](#-tecnologias-utilizadas)
* [Arquitetura do projeto](#-arquitetura-do-projeto)
* [Padrões de Projeto aplicados](#-padrões-de-projeto-aplicados)
* [Fluxo de funcionamento](#-fluxo-de-funcionamento)
* [Rotas da API](#-rotas-da-api)
* [Páginas do front-end](#-páginas-do-front-end)
* [Comunicação entre front-end, back-end e IA](#-comunicação-entre-front-end-back-end-e-ia)
* [Pré-requisitos](#-pré-requisitos)
* [Como executar o projeto](#-como-executar-o-projeto)
* [Scripts disponíveis](#-scripts-disponíveis)
* [Testes](#-testes)
* [Exemplos de uso da API](#-exemplos-de-uso-da-api)
* [Configuração da IA](#-configuração-da-ia)
* [Armazenamento de dados](#-armazenamento-de-dados)
* [Boas práticas de segurança](#-boas-práticas-de-segurança)
* [Deploy](#-deploy)
* [Melhorias futuras](#-melhorias-futuras)
* [Autor](#-autor)
* [Licença](#-licença)

---

## 🎯 Objetivo

O objetivo do projeto é construir uma plataforma simples e funcional para controle de chamados de suporte técnico, permitindo:

* Cadastro e gerenciamento de usuários;
* Cadastro e gerenciamento de técnicos;
* Abertura de chamados;
* Classificação de chamados por categoria;
* Controle de status dos chamados;
* Visualização de relatórios e indicadores;
* Uso de uma Central de Ajuda com IA;
* Aplicação prática de padrões de projeto no back-end.

O projeto também serve como base para estudos sobre arquitetura de software, organização de código, API REST, integração entre front-end e back-end e boas práticas de desenvolvimento.

---

## 🧩 Funcionalidades

### Chamados

* Criar chamados de suporte técnico;
* Listar todos os chamados cadastrados;
* Visualizar detalhes de um chamado específico;
* Avançar o status de um chamado;
* Trabalhar com categorias de chamados;
* Definir prioridade do chamado;
* Relacionar chamados com usuários;
* Organizar o atendimento técnico.

### Usuários

* Cadastrar novos usuários;
* Listar usuários existentes;
* Atualizar informações de usuários;
* Remover usuários cadastrados.

### Técnicos

* Cadastrar técnicos responsáveis pelo atendimento;
* Listar técnicos cadastrados;
* Atualizar dados dos técnicos;
* Remover técnicos;
* Organizar especialistas por área de atuação.

### Dashboard

* Exibir uma visão geral do sistema;
* Mostrar indicadores importantes;
* Facilitar o acompanhamento dos chamados;
* Apoiar a tomada de decisão da equipe técnica.

### Relatórios

* Visualizar gráficos e métricas;
* Acompanhar quantidade de chamados;
* Analisar chamados por status;
* Analisar chamados por categoria;
* Observar o volume de atendimento.

### Central de Ajuda com IA

* Permitir perguntas sobre o funcionamento do sistema;
* Responder dúvidas sobre rotas, telas e execução do projeto;
* Utilizar integração com IA pelo back-end;
* Manter a chave da API protegida no servidor;
* Usar fallback local caso a IA não esteja disponível.

---

## 🖥️ Tecnologias utilizadas

### Front-end

* **React** — biblioteca utilizada para construção da interface;
* **Vite** — ferramenta de build e ambiente de desenvolvimento;
* **React Router DOM** — gerenciamento de rotas no front-end;
* **Axios** — comunicação HTTP com a API;
* **Lucide React** — biblioteca de ícones;
* **Recharts** — criação de gráficos e relatórios;
* **CSS** — estilização da interface.

### Back-end

* **Node.js** — ambiente de execução JavaScript;
* **Express** — framework para criação da API REST;
* **CORS** — controle de acesso entre front-end e back-end;
* **Dotenv** — gerenciamento de variáveis de ambiente;
* **OpenAI SDK** — integração com IA;
* **Node Test Runner** — execução de testes no back-end.

---

## 🏗️ Arquitetura do projeto

O projeto é dividido em duas aplicações principais:

* `front-end`: responsável pela interface visual do sistema;
* `back-end`: responsável pelas regras de negócio, API, padrões de projeto e integração com IA.

```text
AssistTech-Padroes-de-Projeto/
│
├── front-end/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   │
│   ├── package.json
│   └── vite.config.js
│
├── back-end/
│   ├── src/
│   │   ├── controllers/
│   │   ├── data/
│   │   ├── factories/
│   │   ├── middlewares/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── states/
│   │   └── utils/
│   │
│   └── package.json
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🧠 Padrões de Projeto aplicados

Este projeto utiliza padrões de projeto para melhorar a organização, manutenção e escalabilidade do código.

Os principais padrões aplicados são:

* **Factory Method**
* **State**

---

## 1. Factory Method

O padrão **Factory Method** foi aplicado na criação dos chamados.

A ideia principal é evitar que o sistema crie chamados diretamente em uma única estrutura cheia de condicionais. Em vez disso, cada tipo de chamado possui uma classe ou criador responsável por sua criação.

### Onde está aplicado

```text
back-end/src/factories/chamados/
├── ChamadoFactory.js
├── ChamadoCreator.js
├── HardwareChamadoCreator.js
├── SoftwareChamadoCreator.js
├── RedeChamadoCreator.js
└── AcessoChamadoCreator.js
```

### Como funciona no projeto

Quando um novo chamado é criado, o sistema analisa a categoria informada, como `Hardware`, `Software`, `Rede` ou `Acesso`.

Com base nessa categoria, a factory seleciona o criador correto e gera o chamado adequado.

Exemplo conceitual:

```text
Categoria: Hardware
        ↓
HardwareChamadoCreator
        ↓
Criação de chamado de hardware
```

### Categorias possíveis

* Hardware;
* Software;
* Rede;
* Acesso.

### Por que esse padrão foi usado?

O Factory Method foi usado porque o sistema precisa criar chamados de tipos diferentes, mas mantendo uma estrutura padronizada.

Sem esse padrão, a lógica de criação poderia ficar espalhada por várias partes do código, dificultando a manutenção.

### Benefícios no projeto

* Reduz repetição de código;
* Evita excesso de `if/else`;
* Centraliza a criação dos chamados;
* Facilita a criação de novas categorias;
* Melhora a manutenção do back-end;
* Deixa o código mais próximo dos princípios de orientação a objetos.

---

## 2. State

O padrão **State** foi aplicado no controle de status dos chamados.

A ideia principal é representar cada status como um estado independente, com sua própria regra de transição.

### Onde está aplicado

```text
back-end/src/states/chamados/
├── ChamadoState.js
├── ChamadoStatusContext.js
├── AbertoState.js
├── EmAtendimentoState.js
├── ResolvidoState.js
└── FechadoState.js
```

### Como funciona no projeto

Cada chamado possui um status atual. Quando o sistema solicita o avanço do status, o estado atual define qual será o próximo estado permitido.

Fluxo principal:

```text
Aberto
   ↓
Em Atendimento
   ↓
Resolvido
   ↓
Fechado
```

### Estados do chamado

| Estado         | Descrição                                     |
| -------------- | --------------------------------------------- |
| Aberto         | Chamado criado e aguardando atendimento       |
| Em Atendimento | Chamado em análise ou execução por um técnico |
| Resolvido      | Problema solucionado                          |
| Fechado        | Chamado finalizado definitivamente            |

### Por que esse padrão foi usado?

O State foi usado porque chamados passam por diferentes situações durante seu ciclo de vida.

Cada status possui um comportamento específico, e controlar isso apenas com condicionais poderia deixar o código mais difícil de entender e manter.

### Benefícios no projeto

* Organiza melhor as regras de transição;
* Evita lógica de status espalhada;
* Facilita a alteração do fluxo de atendimento;
* Impede transições incorretas;
* Isola o comportamento de cada estado;
* Torna o sistema mais fácil de expandir.

---

## 🔄 Fluxo de funcionamento

```text
Usuário acessa o sistema
        ↓
Usuário cria um chamado
        ↓
Back-end recebe os dados da solicitação
        ↓
Factory Method identifica a categoria do chamado
        ↓
Sistema cria o chamado adequado
        ↓
Chamado fica com status inicial "Aberto"
        ↓
Técnico acompanha o atendimento
        ↓
State controla o avanço do status
        ↓
Chamado passa para "Em Atendimento"
        ↓
Chamado passa para "Resolvido"
        ↓
Chamado é finalizado como "Fechado"
```

---

## 🔌 Rotas da API

A API roda por padrão em:

```text
http://localhost:8080/api
```

### Health Check

| Método | Rota      | Descrição                          |
| ------ | --------- | ---------------------------------- |
| GET    | `/health` | Verifica se a API está funcionando |

### Chamados

| Método | Rota                   | Descrição                     |
| ------ | ---------------------- | ----------------------------- |
| GET    | `/chamados`            | Lista todos os chamados       |
| GET    | `/chamados/:id`        | Busca um chamado pelo ID      |
| POST   | `/chamados`            | Cria um novo chamado          |
| PUT    | `/chamados/:id/status` | Avança o status de um chamado |

### Usuários

| Método | Rota            | Descrição               |
| ------ | --------------- | ----------------------- |
| GET    | `/usuarios`     | Lista todos os usuários |
| POST   | `/usuarios`     | Cria um novo usuário    |
| PUT    | `/usuarios/:id` | Atualiza um usuário     |
| DELETE | `/usuarios/:id` | Remove um usuário       |

### Técnicos

| Método | Rota            | Descrição               |
| ------ | --------------- | ----------------------- |
| GET    | `/tecnicos`     | Lista todos os técnicos |
| POST   | `/tecnicos`     | Cria um novo técnico    |
| PUT    | `/tecnicos/:id` | Atualiza um técnico     |
| DELETE | `/tecnicos/:id` | Remove um técnico       |

### Assistente com IA

| Método | Rota                    | Descrição                                  |
| ------ | ----------------------- | ------------------------------------------ |
| POST   | `/assistente/perguntar` | Envia uma pergunta para a Central de Ajuda |

---

## 🧭 Páginas do front-end

```text
front-end/src/pages/
├── CentralAjuda.jsx
├── Chamados.jsx
├── Dashboard.jsx
├── DetalhesChamado.jsx
├── NovoChamado.jsx
├── Relatorios.jsx
├── Tecnicos.jsx
└── Usuarios.jsx
```

### Descrição das páginas

| Página          | Função                                 |
| --------------- | -------------------------------------- |
| Dashboard       | Mostra uma visão geral do sistema      |
| Chamados        | Lista os chamados cadastrados          |
| NovoChamado     | Permite criar um novo chamado          |
| DetalhesChamado | Exibe detalhes completos de um chamado |
| Usuarios        | Gerencia os usuários do sistema        |
| Tecnicos        | Gerencia os técnicos                   |
| Relatorios      | Exibe gráficos e indicadores           |
| CentralAjuda    | Permite tirar dúvidas usando IA        |

---

## 🔐 Comunicação entre front-end, back-end e IA

O front-end não acessa a OpenAI diretamente.

A comunicação é feita pelo back-end para proteger dados sensíveis, principalmente a chave da API.

```text
Usuário faz uma pergunta na Central de Ajuda
        ↓
Front-end envia a pergunta para a API
        ↓
Back-end recebe a pergunta
        ↓
Serviço da IA processa a solicitação
        ↓
Back-end retorna a resposta
        ↓
Front-end exibe a resposta ao usuário
```

Fluxo técnico:

```text
CentralAjuda.jsx
        ↓
front-end/src/services/api.js
        ↓
POST http://localhost:8080/api/assistente/perguntar
        ↓
back-end/src/services/assistenteService.js
        ↓
OpenAI Responses API
```

### Vantagens dessa abordagem

* Protege a chave da OpenAI;
* Evita expor dados sensíveis no navegador;
* Centraliza as regras de uso da IA;
* Facilita a manutenção da integração;
* Permite trocar o provedor de IA futuramente.

---

## ⚙️ Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

* Node.js;
* npm;
* Git.

Verifique se as ferramentas estão instaladas:

```bash
node -v
npm -v
git --version
```

---

## 🚀 Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Harlen539/AssistTech-Padroes-de-Projeto.git
```

```bash
cd AssistTech-Padroes-de-Projeto
```

### 2. Executar o back-end

Entre na pasta do back-end:

```bash
cd back-end
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env`:

```bash
touch .env
```

Adicione as variáveis de ambiente:

```env
PORT=8080

OPENAI_API_KEY=sua_chave_da_openai
OPENAI_MODEL=coloque_um_modelo_disponivel_na_sua_conta
OPENAI_MAX_OUTPUT_TOKENS=900
OPENAI_LOCAL_MODE=false
OPENAI_ALLOW_LOCAL_FALLBACK=true
```

Execute o servidor:

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:8080/api
```

Teste a API acessando:

```text
http://localhost:8080/api/health
```

### 3. Executar o front-end

Abra outro terminal e acesse a pasta do front-end:

```bash
cd front-end
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env`, caso queira configurar a URL da API:

```bash
touch .env
```

Adicione:

```env
VITE_API_URL=http://localhost:8080/api
```

Execute o front-end:

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:5173
```

---

## 📦 Scripts disponíveis

### Back-end

| Comando       | Descrição                                 |
| ------------- | ----------------------------------------- |
| `npm run dev` | Inicia o servidor em modo desenvolvimento |
| `npm start`   | Inicia o servidor em modo normal          |
| `npm test`    | Executa os testes do back-end             |

### Front-end

| Comando           | Descrição                                |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Inicia o Vite em modo desenvolvimento    |
| `npm run build`   | Gera a versão de produção                |
| `npm run preview` | Visualiza o build de produção localmente |

---

## 🧪 Testes

Para executar os testes do back-end:

```bash
cd back-end
npm test
```

Para testar o build do front-end:

```bash
cd front-end
npm run build
```

---

## ✅ Checklist manual de teste

Após executar o front-end e o back-end, teste os seguintes pontos:

* Acessar o Dashboard;
* Criar um novo chamado;
* Listar chamados;
* Abrir os detalhes de um chamado;
* Avançar o status de um chamado;
* Cadastrar um usuário;
* Listar usuários;
* Atualizar um usuário;
* Remover um usuário;
* Cadastrar um técnico;
* Listar técnicos;
* Atualizar um técnico;
* Remover um técnico;
* Acessar os relatórios;
* Abrir a Central de Ajuda;
* Perguntar na Central de Ajuda: `Como rodo o front-end e o back-end?`;
* Perguntar na Central de Ajuda: `Onde o Factory Method foi aplicado?`;
* Perguntar na Central de Ajuda: `Como funciona o padrão State?`.

---

## 🧾 Exemplos de uso da API

### Criar chamado

```http
POST /api/chamados
Content-Type: application/json
```

Exemplo de corpo:

```json
{
  "titulo": "Computador não liga",
  "descricao": "O computador do setor financeiro não está ligando.",
  "categoria": "Hardware",
  "prioridade": "Alta",
  "usuarioId": 1
}
```

### Avançar status de chamado

```http
PUT /api/chamados/1/status
```

### Criar usuário

```http
POST /api/usuarios
Content-Type: application/json
```

Exemplo de corpo:

```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "setor": "Financeiro"
}
```

### Criar técnico

```http
POST /api/tecnicos
Content-Type: application/json
```

Exemplo de corpo:

```json
{
  "nome": "Maria Souza",
  "email": "maria@email.com",
  "especialidade": "Hardware"
}
```

---

## 🤖 Configuração da IA

A Central de Ajuda utiliza uma rota no back-end para processar perguntas.

O arquivo de configuração deve ficar em:

```text
back-end/.env
```

Exemplo:

```env
OPENAI_API_KEY=sua_chave_da_openai
OPENAI_MODEL=coloque_um_modelo_disponivel_na_sua_conta
OPENAI_MAX_OUTPUT_TOKENS=900
OPENAI_LOCAL_MODE=false
OPENAI_ALLOW_LOCAL_FALLBACK=true
```

### Variáveis de ambiente

| Variável                      | Descrição                             |
| ----------------------------- | ------------------------------------- |
| `OPENAI_API_KEY`              | Chave da API da OpenAI                |
| `OPENAI_MODEL`                | Modelo utilizado para gerar respostas |
| `OPENAI_MAX_OUTPUT_TOKENS`    | Limite máximo de tokens da resposta   |
| `OPENAI_LOCAL_MODE`           | Quando `true`, usa respostas locais   |
| `OPENAI_ALLOW_LOCAL_FALLBACK` | Permite fallback local se a IA falhar |

### Observações importantes

* Nunca coloque a chave da OpenAI no front-end;
* Nunca envie o arquivo `.env` para o GitHub;
* A chave da API deve ficar somente no back-end;
* O front-end deve chamar apenas a API do próprio projeto;
* Em produção, configure as variáveis de ambiente no painel da hospedagem.

---

## 🗃️ Armazenamento de dados

O projeto possui uma camada de dados e repositórios no back-end, responsável por organizar as informações utilizadas pela aplicação.

Para uma versão mais robusta e adequada para produção, recomenda-se integrar um banco de dados real.

Sugestões:

* PostgreSQL;
* MySQL;
* MongoDB;
* SQLite;
* Supabase;
* Firebase.

---

## 🛡️ Boas práticas de segurança

* Não expor arquivos `.env`;
* Manter chaves sensíveis apenas no back-end;
* Validar os dados recebidos nas rotas;
* Configurar CORS de forma mais restrita em produção;
* Implementar autenticação;
* Criar controle de permissões;
* Limitar tamanho de anexos;
* Utilizar HTTPS em produção;
* Registrar logs de erro no servidor;
* Evitar retornar mensagens internas de erro para o usuário final.

---

## 🚀 Deploy

O deploy pode ser feito separando o front-end e o back-end.

### Deploy do back-end

O back-end pode ser publicado em plataformas como:

* Render;
* Railway;
* Fly.io;
* Heroku;
* VPS própria.

Variáveis necessárias em produção:

```env
PORT=8080
OPENAI_API_KEY=sua_chave_da_openai
OPENAI_MODEL=coloque_um_modelo_disponivel_na_sua_conta
OPENAI_MAX_OUTPUT_TOKENS=900
OPENAI_LOCAL_MODE=false
OPENAI_ALLOW_LOCAL_FALLBACK=true
```

### Deploy do front-end

O front-end pode ser publicado em plataformas como:

* Vercel;
* Netlify;
* GitHub Pages;
* Cloudflare Pages.

Configure a URL da API em produção:

```env
VITE_API_URL=https://sua-api.com/api
```

Depois gere o build:

```bash
npm run build
```

---

## 📈 Melhorias futuras

Sugestões para evolução do projeto:

* Implementar autenticação com login e senha;
* Criar perfis de acesso:

  * Administrador;
  * Técnico;
  * Usuário comum;
* Adicionar banco de dados real;
* Criar histórico completo de alterações de status;
* Permitir comentários nos chamados;
* Adicionar notificações por e-mail;
* Implementar upload de arquivos em serviço externo;
* Criar filtros avançados para chamados;
* Adicionar busca por título, categoria, prioridade e status;
* Implementar paginação;
* Melhorar o dashboard administrativo;
* Exportar relatórios em PDF;
* Exportar relatórios em CSV;
* Criar testes automatizados para o front-end;
* Criar documentação Swagger/OpenAPI;
* Adicionar Docker;
* Configurar CI/CD com GitHub Actions;
* Criar tela de login;
* Adicionar recuperação de senha;
* Adicionar controle de permissões por rota;
* Salvar logs de atendimento;
* Adicionar campo de prazo/SLA para chamados.

---

## 🧑‍💻 Autor

Desenvolvido por **Harlen Galdino**.

GitHub:

```text
https://github.com/Harlen539
```

---

## 📄 Licença

Este projeto está sob a licença MIT.

Consulte o arquivo `LICENSE` para mais detalhes.

---

## 📌 Resumo técnico

O **AssistTech** é uma aplicação web full-stack desenvolvida para gerenciamento de chamados de suporte técnico.

O projeto utiliza React e Vite no front-end, Node.js e Express no back-end, além de aplicar os padrões de projeto **Factory Method** e **State** para organizar a criação e o controle de status dos chamados.

A aplicação também conta com uma Central de Ajuda integrada à IA, mantendo a comunicação com o serviço de inteligência artificial centralizada no back-end para proteger dados sensíveis.

De forma geral, o projeto demonstra como estruturar uma aplicação web modular, organizada e preparada para evolução.
