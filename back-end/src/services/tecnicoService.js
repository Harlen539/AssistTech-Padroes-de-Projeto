import { tecnicoRepository } from '../repositories/index.js';
import { AppError } from '../utils/AppError.js';

function validarTecnico(dados) {
  const camposObrigatorios = ['nome', 'especialidade'];

  for (const campo of camposObrigatorios) {
    if (!dados?.[campo] || String(dados[campo]).trim() === '') {
      throw new AppError(`Campo obrigatorio ausente: ${campo}.`, 422);
    }
  }
}

const tecnicoService = {
  listar() {
    return tecnicoRepository.findAll();
  },

  criar(dados) {
    validarTecnico(dados);

    return tecnicoRepository.create({
      nome: dados.nome.trim(),
      especialidade: dados.especialidade.trim(),
    });
  },

  atualizar(id, dados) {
    validarTecnico(dados);

    const tecnico = tecnicoRepository.update(id, {
      nome: dados.nome.trim(),
      especialidade: dados.especialidade.trim(),
    });

    if (!tecnico) {
      throw new AppError('Tecnico nao encontrado.', 404);
    }

    return tecnico;
  },

  remover(id) {
    const removido = tecnicoRepository.delete(id);

    if (!removido) {
      throw new AppError('Tecnico nao encontrado.', 404);
    }
  },
};

export default tecnicoService;
