import tecnicoService from '../services/tecnicoService.js';

const tecnicoController = {
  listar(request, response) {
    response.json(tecnicoService.listar());
  },

  criar(request, response) {
    response.status(201).json(tecnicoService.criar(request.body));
  },

  atualizar(request, response) {
    response.json(tecnicoService.atualizar(request.params.id, request.body));
  },

  remover(request, response) {
    tecnicoService.remover(request.params.id);
    response.status(204).send();
  },
};

export default tecnicoController;
