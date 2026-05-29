import usuarioService from '../services/usuarioService.js';

const usuarioController = {
  listar(request, response) {
    response.json(usuarioService.listar());
  },

  criar(request, response) {
    response.status(201).json(usuarioService.criar(request.body));
  },

  atualizar(request, response) {
    response.json(usuarioService.atualizar(request.params.id, request.body));
  },

  remover(request, response) {
    usuarioService.remover(request.params.id);
    response.status(204).send();
  },
};

export default usuarioController;
