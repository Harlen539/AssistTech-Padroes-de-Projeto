import { formatarAgora } from '../../utils/dateFormatter.js';

export class ChamadoCreator {
  criar(dados, id) {
    return this.factoryMethod(dados, id);
  }

  factoryMethod() {
    throw new Error('Subclasses devem implementar factoryMethod.');
  }

  montarChamado(dados, id, configuracao) {
    const atualizadoEm = formatarAgora();

    return {
      id,
      titulo: dados.titulo.trim(),
      descricao: dados.descricao.trim(),
      categoria: configuracao.categoria,
      prioridade: dados.prioridade || configuracao.prioridade,
      status: 'Aberto',
      solicitante: dados.solicitante || 'Nao informado',
      tecnico: dados.tecnico || configuracao.tecnico,
      atualizadoEm,
      historico: [
        {
          status: 'Aberto',
          data: atualizadoEm,
          responsavel: dados.solicitante || 'Sistema',
          texto: 'Chamado registrado no sistema.',
        },
      ],
    };
  }
}
