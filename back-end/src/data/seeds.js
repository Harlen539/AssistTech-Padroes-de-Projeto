export const chamadosSeed = [
  {
    id: 1,
    titulo: 'Impressora nao esta funcionando',
    descricao: 'A impressora da recepcao nao responde aos comandos de impressao.',
    categoria: 'Hardware',
    prioridade: 'Alta',
    status: 'Em Atendimento',
    solicitante: 'Mariana Alves',
    tecnico: 'Ana Beatriz',
    atualizadoEm: 'Hoje, 10:24',
  },
  {
    id: 2,
    titulo: 'Erro ao salvar arquivo no sistema',
    descricao: 'Ao salvar documentos no sistema, uma mensagem de erro interrompe a operacao.',
    categoria: 'Software',
    prioridade: 'Média',
    status: 'Aberto',
    solicitante: 'Pedro Nunes',
    tecnico: 'Joao Pereira',
    atualizadoEm: 'Hoje, 09:15',
  },
  {
    id: 3,
    titulo: 'Internet intermitente no setor',
    descricao: 'A conexao do setor financeiro cai varias vezes ao longo do expediente.',
    categoria: 'Rede',
    prioridade: 'Alta',
    status: 'Em Atendimento',
    solicitante: 'Carolina Mendes',
    tecnico: 'Marcos Vinicius',
    atualizadoEm: 'Hoje, 08:47',
  },
  {
    id: 4,
    titulo: 'Solicitacao de acesso ao sistema',
    descricao: 'A colaboradora precisa de permissao de consulta ao modulo de compras.',
    categoria: 'Acesso',
    prioridade: 'Baixa',
    status: 'Resolvido',
    solicitante: 'Diego Ramos',
    tecnico: 'Juliana Costa',
    atualizadoEm: 'Ontem, 17:32',
  },
];

export const usuariosSeed = [
  { id: 1, nome: 'Mariana Alves', email: 'mariana.alves@empresa.com', setor: 'Financeiro' },
  { id: 2, nome: 'Pedro Nunes', email: 'pedro.nunes@empresa.com', setor: 'Comercial' },
  { id: 3, nome: 'Carolina Mendes', email: 'carolina.mendes@empresa.com', setor: 'Recursos Humanos' },
  { id: 4, nome: 'Diego Ramos', email: 'diego.ramos@empresa.com', setor: 'Administrativo' },
];

export const tecnicosSeed = [
  { id: 1, nome: 'Ana Beatriz', especialidade: 'Hardware' },
  { id: 2, nome: 'Joao Pereira', especialidade: 'Software' },
  { id: 3, nome: 'Marcos Vinicius', especialidade: 'Rede' },
  { id: 4, nome: 'Juliana Costa', especialidade: 'Acesso' },
];
