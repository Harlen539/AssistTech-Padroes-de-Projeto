import { chamadosSeed, tecnicosSeed, usuariosSeed } from '../data/seeds.js';
import { InMemoryRepository } from './InMemoryRepository.js';

export const chamadoRepository = new InMemoryRepository(chamadosSeed);
export const usuarioRepository = new InMemoryRepository(usuariosSeed);
export const tecnicoRepository = new InMemoryRepository(tecnicosSeed);
