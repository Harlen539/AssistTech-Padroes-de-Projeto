# AssistTech Back-end

API REST em Node.js/Express para atender o front-end do AssistTech.

## Como rodar

```bash
npm install
npm run dev
```

A API sobe em `http://localhost:8080/api`.

Para ativar a Central de Ajuda com IA, crie um arquivo `.env` dentro de `back-end`:

```bash
OPENAI_API_KEY=sua_chave_da_openai
OPENAI_MODEL=gpt-4.1-mini
```

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

## Padroes usados

- **Factory Method**: `src/factories/chamados` escolhe o criador correto de chamado conforme a categoria.
- **State**: `src/states/chamados` encapsula as regras de transicao de status.
