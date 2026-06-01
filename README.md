# AssistTech

AssistTech e uma aplicacao full-stack para abertura e gerenciamento de chamados de suporte tecnico. O projeto combina um front-end React/Vite com uma API Node.js/Express e demonstra os padroes de projeto **Factory Method** e **State**.

Tambem existe uma **Central de Ajuda com IA** para responder perguntas sobre o proprio projeto, codigo, rotas, telas, execucao e manutencao.

## Funcionalidades

- Dashboard com metricas de chamados.
- Listagem, criacao e detalhes de chamados.
- Cadastro e listagem de usuarios.
- Cadastro e listagem de tecnicos.
- Relatorios com graficos.
- Anexos de imagem em chamados.
- Central de Ajuda com OpenAI Responses API no back-end.
- Fallback local gratuito quando a OpenAI nao estiver disponivel.

## Tecnologias

Front-end:

- React
- Vite
- React Router DOM
- Axios
- Lucide React
- Recharts
- CSS

Back-end:

- Node.js
- Express
- OpenAI SDK
- Dotenv
- Test runner nativo do Node

## Estrutura

```text
AssistTech/
  front-end/
    src/
      components/
      data/
      pages/
      routes/
      services/
      styles/
      utils/
  back-end/
    src/
      controllers/
      data/
      factories/
      middlewares/
      repositories/
      routes/
      services/
      states/
      utils/
```

## Como rodar

Em um terminal:

```bash
cd back-end
npm install
npm run dev
```

A API fica em `http://localhost:8080/api`.

Em outro terminal:

```bash
cd front-end
npm install
npm run dev
```

O Vite normalmente fica em `http://localhost:5173`.

## Configuracao da OpenAI

Crie `back-end/.env`:

```bash
OPENAI_API_KEY=sua_chave_da_openai
OPENAI_MODEL=gpt-5.5
OPENAI_MAX_OUTPUT_TOKENS=900
OPENAI_LOCAL_MODE=false
OPENAI_ALLOW_LOCAL_FALLBACK=true
```

Notas importantes:

- A chave fica somente no back-end.
- O front-end chama apenas `POST /api/assistente/perguntar`.
- `gpt-5.5` e o modelo flagship atual recomendado pela documentacao oficial para raciocinio e codigo. Para reduzir custo/latencia, troque `OPENAI_MODEL` por um modelo menor habilitado na sua conta, como `gpt-5.4-mini` ou `gpt-5.4-nano`.
- Para rodar sem custo de OpenAI, use `OPENAI_LOCAL_MODE=true`. Nesse modo a Central responde com base em respostas locais sobre o projeto.
- Para deixar a IA trabalhar de verdade, mantenha `OPENAI_LOCAL_MODE=false`. Se a conta estiver sem quota ou credito, a rota retorna erro claro em vez de fingir resposta local.
- Com `OPENAI_ALLOW_LOCAL_FALLBACK=true`, o back-end tenta a OpenAI primeiro e so usa apoio local se a API falhar por quota/chave/modelo.
- ChatGPT Plus e API Platform sao cobrados separadamente; ter Plus nao libera creditos automaticos para `OPENAI_API_KEY`.

## Fronteira cliente/servidor

O cliente React nunca chama a OpenAI diretamente.

Fluxo da Central de Ajuda:

```text
CentralAjuda.jsx
  -> front-end/src/services/api.js
  -> POST http://localhost:8080/api/assistente/perguntar
  -> back-end/src/services/assistenteService.js
  -> OpenAI Responses API
```

Isso protege `OPENAI_API_KEY` e deixa prompts, modelo e contexto sob controle do servidor.

A tela tambem envia um resumo operacional do app aberto naquele momento: total de chamados, usuarios, tecnicos, chamados por status/categoria, nomes de usuarios e tecnicos, e os chamados mais recentes. Assim a IA consegue responder perguntas simples como "quantos usuarios temos?", "quais chamados estao em atendimento?" ou "quem atende Hardware?".

## Padroes de projeto

Factory Method:

- `back-end/src/factories/chamados/ChamadoFactory.js`
- `back-end/src/factories/chamados/*ChamadoCreator.js`

State:

- `back-end/src/states/chamados/ChamadoStatusContext.js`
- `back-end/src/states/chamados/*State.js`

## Onde ajustar a IA depois

- Modelo: `OPENAI_MODEL` em `back-end/.env`.
- Prompt: constante `instructions` em `back-end/src/services/assistenteService.js`.
- Arquivos de contexto: `contextFiles` em `back-end/src/services/codeContextService.js`.
- Tamanho da resposta: `OPENAI_MAX_OUTPUT_TOKENS`.
- Fallback local: `OPENAI_LOCAL_MODE` e `OPENAI_ALLOW_LOCAL_FALLBACK`.
- Imagens: hoje o projeto trabalha com anexos enviados pelo usuario. Se quiser geracao de imagens por IA, implemente uma rota server-side no back-end para manter a chave protegida.

## Validacao

Back-end:

```bash
cd back-end
npm test
npm run dev
```

Front-end:

```bash
cd front-end
npm run build
```

Checklist manual:

- Abrir `http://localhost:5173`.
- Acessar Central de Ajuda.
- Perguntar: "Como rodo o front-end e o back-end?"
- Perguntar: "Onde o Factory Method foi aplicado?"
- Perguntar: "Como funciona a troca de status com State?"
- Criar um chamado com anexo e conferir o detalhe do chamado.

## Deploy

- Configure `OPENAI_API_KEY`, `OPENAI_MODEL`, `OPENAI_MAX_OUTPUT_TOKENS` e `OPENAI_LOCAL_MODE` no ambiente do provedor.
- Publique o back-end como API Node/Express.
- Publique o front-end como app estatico Vite.
- Em producao, ajuste a URL da API no front-end se ela nao estiver em `localhost:8080`.

No front-end, isso pode ser feito com:

```bash
VITE_API_URL=https://sua-api.com/api
```
