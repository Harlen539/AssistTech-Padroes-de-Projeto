import { ChamadoFactory } from '../factories/chamados/ChamadoFactory.js';
import { chamadoRepository } from '../repositories/index.js';
import { ChamadoStatusContext } from '../states/chamados/ChamadoStatusContext.js';
import { AppError } from '../utils/AppError.js';

function validarCriacao(dados) {
  const camposObrigatorios = ['titulo', 'descricao', 'categoria'];

  for (const campo of camposObrigatorios) {
    if (!dados?.[campo] || String(dados[campo]).trim() === '') {
      throw new AppError(`Campo obrigatorio ausente: ${campo}.`, 422);
    }
  }
}

const chamadoService = {
  listar() {
    return chamadoRepository.findAll();
  },

  buscarPorId(id) {
    const chamado = chamadoRepository.findById(id);

    if (!chamado) {
      throw new AppError('Chamado nao encontrado.', 404);
    }

    return chamado;
  },

  criar(dados) {
    validarCriacao(dados);

    const chamado = ChamadoFactory.criar(dados, chamadoRepository.nextId());
    return chamadoRepository.create(chamado);
  },

  avancarStatus(id) {
    const chamado = this.buscarPorId(id);
    const contexto = ChamadoStatusContext.from(chamado.status);
    const atualizado = contexto.avancar(chamado);

    return chamadoRepository.update(id, atualizado);
  },
};

export default chamadoService;
