import { ChamadoCreator } from './ChamadoCreator.js';

export class RedeChamadoCreator extends ChamadoCreator {
  factoryMethod(dados, id) {
    return this.montarChamado(dados, id, {
      categoria: 'Rede',
      prioridade: 'Alta',
      tecnico: 'Marcos Vinicius',
    });
  }
}
