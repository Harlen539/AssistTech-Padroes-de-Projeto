export const chamadosMock = [
  { id: 1, titulo: 'Impressora não está funcionando', descricao: 'A impressora da recepção não responde aos comandos de impressão. Os cabos foram verificados e o equipamento reiniciado, mas o problema continua.', categoria: 'Hardware', prioridade: 'Alta', status: 'Em Atendimento', solicitante: 'Mariana Alves', tecnico: 'Ana Beatriz', atualizadoEm: 'Hoje, 10:24' },
  { id: 2, titulo: 'Erro ao salvar arquivo no sistema', descricao: 'Ao salvar documentos no sistema, uma mensagem de erro interrompe a operação e nenhuma alteração é armazenada. O problema ocorre com diferentes arquivos.', categoria: 'Software', prioridade: 'Média', status: 'Aberto', solicitante: 'Pedro Nunes', tecnico: 'João Pereira', atualizadoEm: 'Hoje, 09:15' },
  { id: 3, titulo: 'Internet intermitente no setor', descricao: 'A conexão do setor financeiro cai várias vezes ao longo do expediente, interrompendo chamadas e acesso aos sistemas internos.', categoria: 'Rede', prioridade: 'Alta', status: 'Em Atendimento', solicitante: 'Carolina Mendes', tecnico: 'Marcos Vinicius', atualizadoEm: 'Hoje, 08:47' },
  { id: 4, titulo: 'Solicitação de acesso ao sistema', descricao: 'A colaboradora precisa de permissão de consulta ao módulo de compras para realizar as atividades da nova função.', categoria: 'Acesso', prioridade: 'Baixa', status: 'Resolvido', solicitante: 'Diego Ramos', tecnico: 'Juliana Costa', atualizadoEm: 'Ontem, 17:32' },
  { id: 5, titulo: 'Computador com lentidão', descricao: 'O computador demora para iniciar e trava ao abrir planilhas e navegador, prejudicando o atendimento durante o turno.', categoria: 'Hardware', prioridade: 'Média', status: 'Resolvido', solicitante: 'Sofia Barros', tecnico: 'Ana Beatriz', atualizadoEm: 'Ontem, 16:08' },
  { id: 6, titulo: 'Falha ao enviar e-mail', descricao: 'As mensagens ficam presas na caixa de saída e retornam erro de envio, mesmo após confirmação da conexão com a internet.', categoria: 'Software', prioridade: 'Baixa', status: 'Fechado', solicitante: 'Renato Lima', tecnico: 'João Pereira', atualizadoEm: 'Ontem, 15:21' },
  { id: 7, titulo: 'Instalação de software', descricao: 'É necessária a instalação da ferramenta de edição de PDF homologada para preparar contratos e documentos administrativos.', categoria: 'Software', prioridade: 'Média', status: 'Em Atendimento', solicitante: 'Paula Freitas', tecnico: 'João Pereira', atualizadoEm: 'Ontem, 14:03' },
  { id: 8, titulo: 'Problema com VPN', descricao: 'O usuário não consegue estabelecer conexão VPN fora do escritório; a autenticação é aceita, mas a sessão desconecta logo em seguida.', categoria: 'Rede', prioridade: 'Alta', status: 'Aberto', solicitante: 'Bruno Castro', tecnico: 'Marcos Vinicius', atualizadoEm: 'Ontem, 11:45' },
  { id: 9, titulo: 'Monitor não liga', descricao: 'O monitor permanece sem imagem após ligar a estação. Foram testadas outra tomada e reconexão dos cabos sem resultado.', categoria: 'Hardware', prioridade: 'Média', status: 'Em Atendimento', solicitante: 'Pedro Nunes', tecnico: 'Ana Beatriz', atualizadoEm: 'Ontem, 10:32' },
  { id: 10, titulo: 'Atualização de sistema', descricao: 'A aplicação informa que existe uma atualização obrigatória, porém o processo falha antes da conclusão e impede o acesso ao módulo.', categoria: 'Software', prioridade: 'Baixa', status: 'Resolvido', solicitante: 'Mariana Alves', tecnico: 'João Pereira', atualizadoEm: '21/05/2025, 16:40' },
  { id: 11, titulo: 'Erro ao gerar relatório', descricao: 'Ao solicitar o relatório mensal, a tela fica carregando e finaliza sem gerar o arquivo para download.', categoria: 'Software', prioridade: 'Média', status: 'Fechado', solicitante: 'Carolina Mendes', tecnico: 'João Pereira', atualizadoEm: '21/05/2025, 14:18' },
  { id: 12, titulo: 'Teclado não responde', descricao: 'Algumas teclas deixam de responder durante a digitação, inclusive após reconectar o periférico em outra porta USB.', categoria: 'Hardware', prioridade: 'Baixa', status: 'Aberto', solicitante: 'Diego Ramos', tecnico: 'Ana Beatriz', atualizadoEm: '21/05/2025, 09:57' },
];

export const usuariosMock = [
  { id: 1, nome: 'Mariana Alves', email: 'mariana.alves@empresa.com', setor: 'Financeiro' },
  { id: 2, nome: 'Pedro Nunes', email: 'pedro.nunes@empresa.com', setor: 'Comercial' },
  { id: 3, nome: 'Carolina Mendes', email: 'carolina.mendes@empresa.com', setor: 'Recursos Humanos' },
  { id: 4, nome: 'Diego Ramos', email: 'diego.ramos@empresa.com', setor: 'Administrativo' },
  { id: 5, nome: 'Sofia Barros', email: 'sofia.barros@empresa.com', setor: 'Financeiro' },
  { id: 6, nome: 'Renato Lima', email: 'renato.lima@empresa.com', setor: 'Comercial' },
  { id: 7, nome: 'Paula Freitas', email: 'paula.freitas@empresa.com', setor: 'Recursos Humanos' },
  { id: 8, nome: 'Bruno Castro', email: 'bruno.castro@empresa.com', setor: 'Administrativo' },
];

export const tecnicosMock = [
  { id: 1, nome: 'Ana Beatriz', especialidade: 'Hardware' },
  { id: 2, nome: 'João Pereira', especialidade: 'Software' },
  { id: 3, nome: 'Marcos Vinicius', especialidade: 'Rede' },
  { id: 4, nome: 'Juliana Costa', especialidade: 'Acesso' },
];
