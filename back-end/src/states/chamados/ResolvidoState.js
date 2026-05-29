import { ChamadoState } from './ChamadoState.js';

export class ResolvidoState extends ChamadoState {
  constructor() {
    super('Resolvido');
  }

  proximoStatus() {
    return 'Fechado';
  }
}
