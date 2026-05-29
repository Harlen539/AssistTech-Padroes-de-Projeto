import { ChamadoState } from './ChamadoState.js';

export class FechadoState extends ChamadoState {
  constructor() {
    super('Fechado');
  }

  avancar(chamado) {
    return chamado;
  }
}
