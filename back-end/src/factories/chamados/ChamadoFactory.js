import { AppError } from '../../utils/AppError.js';
import { AcessoChamadoCreator } from './AcessoChamadoCreator.js';
import { HardwareChamadoCreator } from './HardwareChamadoCreator.js';
import { RedeChamadoCreator } from './RedeChamadoCreator.js';
import { SoftwareChamadoCreator } from './SoftwareChamadoCreator.js';

const creators = {
  Hardware: new HardwareChamadoCreator(),
  Software: new SoftwareChamadoCreator(),
  Rede: new RedeChamadoCreator(),
  Acesso: new AcessoChamadoCreator(),
};

export class ChamadoFactory {
  static criar(dados, id) {
    const creator = creators[dados.categoria];

    if (!creator) {
      throw new AppError('Categoria de chamado invalida.', 422);
    }

    return creator.criar(dados, id);
  }
}
