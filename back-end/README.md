# AssistTech Back-end

API REST em Node.js/Express para o AssistTech, com chamados, usuarios, tecnicos e a Central de Ajuda com IA.

## Como rodar

```bash
npm install
npm run dev
```

A API sobe em `http://localhost:8080/api`.

## Variaveis de ambiente

Crie `back-end/.env` a partir de `.env.example`:

```bash
OPENAI_API_KEY=sua_chave_da_openai
OPENAI_MODEL=gpt-5.5
OPENAI_MAX_OUTPUT_TOKENS=900
OPENAI_LOCAL_MODE=false
OPENAI_ALLOW_LOCAL_FALLBACK=true
```

Observacoes:

- `OPENAI_API_KEY` fica somente no back-end. Nunca coloque essa chave no React.
- `OPENAI_MODEL` define o modelo usado pela Central de Ajuda.
- `gpt-5.5` e o modelo flagship atual recomendado pela documentacao oficial para raciocinio e codigo. Para reduzir custo/latencia, troque por um modelo menor habilitado na sua conta, como `gpt-5.4-mini` ou `gpt-5.4-nano`.
- `OPENAI_LOCAL_MODE=false` faz a IA trabalhar de verdade chamando a OpenAI.
- `OPENAI_LOCAL_MODE=true` pula a OpenAI e usa respostas locais, util apenas para apresentacao/teste sem custo.
- `OPENAI_ALLOW_LOCAL_FALLBACK=true` tenta a OpenAI primeiro e usa apoio local apenas quando a API falhar por quota/chave/modelo.
- ChatGPT Plus e API Platform sao cobrados separadamente; ter Plus nao libera creditos automaticos para a `OPENAI_API_KEY`.

## Central de Ajuda com IA

Fluxo:

1. O front-end chama `POST /api/assistente/perguntar`.
2. O back-end monta o contexto do projeto com `src/services/codeContextService.js`.
3. `src/services/assistenteService.js` chama `client.responses.create(...)`, usando a OpenAI Responses API.
4. Se a OpenAI estiver indisponivel, sem quota, com chave invalida ou modelo indisponivel, o back-end usa apoio local quando `OPENAI_ALLOW_LOCAL_FALLBACK=true`.

Essa fronteira protege a chave: o navegador nunca conversa diretamente com a OpenAI.

Além da pergunta e do historico, o front-end envia um contexto operacional com totais, chamados por status/categoria, usuarios, tecnicos e chamados recentes. Isso permite perguntas simples sobre o sistema em uso, nao apenas sobre o codigo.

## Endpoints principais

- `GET /api/health`
- `GET /api/chamados`
- `GET /api/chamados/:id`
- `POST /api/chamados`
- `PUT /api/chamados/:id/status`
- `GET /api/usuarios`
- `POST /api/usuarios`
- `PUT /api/usuarios/:id`
- `DELETE /api/usuarios/:id`
- `GET /api/tecnicos`
- `POST /api/tecnicos`
- `PUT /api/tecnicos/:id`
- `DELETE /api/tecnicos/:id`
- `POST /api/assistente/perguntar`

## Padroes usados

- **Factory Method**: `src/factories/chamados` escolhe o criador correto de chamado conforme a categoria.
- **State**: `src/states/chamados` encapsula as regras de transicao de status.

## Onde ajustar depois

- Modelo: altere `OPENAI_MODEL` no `.env`.
- Prompt: edite `instructions` em `src/services/assistenteService.js`.
- Contexto enviado para a IA: edite `contextFiles` em `src/services/codeContextService.js`.
- Limite de resposta: ajuste `OPENAI_MAX_OUTPUT_TOKENS`.
- Fallback local: ajuste `OPENAI_LOCAL_MODE` e `OPENAI_ALLOW_LOCAL_FALLBACK`.
- Imagens: hoje o AssistTech usa anexos enviados pelo usuario. Se quiser geracao de imagem por IA no futuro, crie uma rota server-side no back-end e mantenha a chave fora do front-end.

## Validacao rapida

```bash
npm test
npm run dev
```

Depois teste:

- `GET http://localhost:8080/api/health`
- `POST http://localhost:8080/api/assistente/perguntar` com `{ "pergunta": "Como rodo o projeto?" }`
- Na tela Central de Ajuda, envie perguntas sobre Factory Method, State, rotas e anexos.

## Deploy

Configure as mesmas variaveis de ambiente no provedor de hospedagem. Em producao, deixe `OPENAI_LOCAL_MODE=false` se quiser usar a OpenAI, ou `true` se quiser manter somente respostas locais.
