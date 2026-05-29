import { AppError } from '../../utils/AppError.js';
import { AbertoState } from './AbertoState.js';
import { EmAtendimentoState } from './EmAtendimentoState.js';
import { FechadoState } from './FechadoState.js';
import { ResolvidoState } from './ResolvidoState.js';

const states = {
  Aberto: new AbertoState(),
  'Em Atendimento': new EmAtendimentoState(),
  Resolvido: new ResolvidoState(),
  Fechado: new FechadoState(),
};

export class ChamadoStatusContext {
  constructor(state) {
    this.state = state;
  }

  static from(status) {
    const state = states[status];

    if (!state) {
      throw new AppError('Status de chamado invalido.', 422);
    }

    return new ChamadoStatusContext(state);
  }

  avancar(chamado) {
    return this.state.avancar(chamado);
  }
}
