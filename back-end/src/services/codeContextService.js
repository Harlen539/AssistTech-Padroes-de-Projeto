import fs from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(process.cwd(), '..');

const contextFiles = [
  'front-end/src/App.jsx',
  'front-end/src/routes/AppRoutes.jsx',
  'front-end/src/services/api.js',
  'front-end/src/components/Sidebar.jsx',
  'front-end/src/pages/NovoChamado.jsx',
  'front-end/src/pages/DetalhesChamado.jsx',
  'front-end/src/pages/Chamados.jsx',
  'front-end/src/pages/Dashboard.jsx',
  'front-end/src/data/mockData.js',
  'front-end/src/utils/chamadoMetrics.js',
  'back-end/src/app.js',
  'back-end/src/routes/index.js',
  'back-end/src/routes/chamadoRoutes.js',
  'back-end/src/services/chamadoService.js',
  'back-end/src/factories/chamados/ChamadoFactory.js',
  'back-end/src/factories/chamados/ChamadoCreator.js',
  'back-end/src/states/chamados/ChamadoStatusContext.js',
  'back-end/src/repositories/InMemoryRepository.js',
  'back-end/README.md',
];

function limitarConteudo(conteudo, maximo = 7000) {
  if (conteudo.length <= maximo) {
    return conteudo;
  }

  return `${conteudo.slice(0, maximo)}\n\n[conteudo truncado]`;
}

function lerArquivoRelativo(arquivo) {
  const caminho = path.join(projectRoot, arquivo);

  if (!fs.existsSync(caminho)) {
    return null;
  }

  return {
    arquivo,
    conteudo: limitarConteudo(fs.readFileSync(caminho, 'utf8')),
  };
}

export function montarContextoDoCodigo() {
  return contextFiles
    .map(lerArquivoRelativo)
    .filter(Boolean)
    .map(({ arquivo, conteudo }) => `### ${arquivo}\n\`\`\`\n${conteudo}\n\`\`\``)
    .join('\n\n');
}
