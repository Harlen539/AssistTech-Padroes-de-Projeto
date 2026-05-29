import { ChamadoCreator } from './ChamadoCreator.js';

export class HardwareChamadoCreator extends ChamadoCreator {
  factoryMethod(dados, id) {
    return this.montarChamado(dados, id, {
      categoria: 'Hardware',
      prioridade: 'Média',
      tecnico: 'Ana Beatriz',
    });
  }
}
