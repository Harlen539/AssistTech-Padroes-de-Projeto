import chamadoService from '../services/chamadoService.js';

const chamadoController = {
  listar(request, response) {
    response.json(chamadoService.listar());
  },

  buscarPorId(request, response) {
    response.json(chamadoService.buscarPorId(request.params.id));
  },

  criar(request, response) {
    const chamado = chamadoService.criar(request.body);
    response.status(201).json(chamado);
  },

  avancarStatus(request, response) {
    response.json(chamadoService.avancarStatus(request.params.id));
  },
};

export default chamadoController;
