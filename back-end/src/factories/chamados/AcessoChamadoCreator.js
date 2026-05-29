import { ChamadoCreator } from './ChamadoCreator.js';

export class AcessoChamadoCreator extends ChamadoCreator {
  factoryMethod(dados, id) {
    return this.montarChamado(dados, id, {
      categoria: 'Acesso',
      prioridade: 'Baixa',
      tecnico: 'Juliana Costa',
    });
  }
}
