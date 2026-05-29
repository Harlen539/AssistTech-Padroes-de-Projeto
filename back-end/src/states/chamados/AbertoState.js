import { ChamadoState } from './ChamadoState.js';

export class AbertoState extends ChamadoState {
  constructor() {
    super('Aberto');
  }

  proximoStatus() {
    return 'Em Atendimento';
  }
}
