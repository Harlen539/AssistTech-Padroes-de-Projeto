import { usuarioRepository } from '../repositories/index.js';
import { AppError } from '../utils/AppError.js';

function validarUsuario(dados) {
  const camposObrigatorios = ['nome', 'email', 'setor'];

  for (const campo of camposObrigatorios) {
    if (!dados?.[campo] || String(dados[campo]).trim() === '') {
      throw new AppError(`Campo obrigatorio ausente: ${campo}.`, 422);
    }
  }
}

const usuarioService = {
  listar() {
    return usuarioRepository.findAll();
  },

  criar(dados) {
    validarUsuario(dados);

    return usuarioRepository.create({
      nome: dados.nome.trim(),
      email: dados.email.trim(),
      setor: dados.setor.trim(),
    });
  },

  atualizar(id, dados) {
    validarUsuario(dados);

    const usuario = usuarioRepository.update(id, {
      nome: dados.nome.trim(),
      email: dados.email.trim(),
      setor: dados.setor.trim(),
    });

    if (!usuario) {
      throw new AppError('Usuario nao encontrado.', 404);
    }

    return usuario;
  },

  remover(id) {
    const removido = usuarioRepository.delete(id);

    if (!removido) {
      throw new AppError('Usuario nao encontrado.', 404);
    }
  },
};

export default usuarioService;
