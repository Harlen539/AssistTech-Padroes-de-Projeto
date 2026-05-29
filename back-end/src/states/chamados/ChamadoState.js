import { formatarAgora } from '../../utils/dateFormatter.js';

export class ChamadoState {
  constructor(status) {
    this.status = status;
  }

  proximoStatus() {
    return this.status;
  }

  avancar(chamado) {
    const novoStatus = this.proximoStatus();
    const atualizadoEm = formatarAgora();

    return {
      ...chamado,
      status: novoStatus,
      atualizadoEm,
      historico: [
        ...(chamado.historico || []),
        {
          status: novoStatus,
          data: atualizadoEm,
          responsavel: chamado.tecnico || 'Sistema',
          texto: this.textoHistorico(novoStatus),
        },
      ],
    };
  }

  textoHistorico(status) {
    const textos = {
      'Em Atendimento': 'Chamado assumido por um tecnico.',
      Resolvido: 'Chamado marcado como resolvido.',
      Fechado: 'Chamado finalizado e encerrado.',
    };

    return textos[status] || 'Status do chamado mantido.';
  }
}
