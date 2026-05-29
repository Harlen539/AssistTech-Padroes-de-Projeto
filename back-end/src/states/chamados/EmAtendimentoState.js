import { ChamadoState } from './ChamadoState.js';

export class EmAtendimentoState extends ChamadoState {
  constructor() {
    super('Em Atendimento');
  }

  proximoStatus() {
    return 'Resolvido';
  }
}
