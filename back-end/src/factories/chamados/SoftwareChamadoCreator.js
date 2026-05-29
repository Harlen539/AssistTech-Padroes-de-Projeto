import { ChamadoCreator } from './ChamadoCreator.js';

export class SoftwareChamadoCreator extends ChamadoCreator {
  factoryMethod(dados, id) {
    return this.montarChamado(dados, id, {
      categoria: 'Software',
      prioridade: 'Média',
      tecnico: 'Joao Pereira',
    });
  }
}
