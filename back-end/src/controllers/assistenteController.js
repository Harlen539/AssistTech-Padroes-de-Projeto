import assistenteService from '../services/assistenteService.js';

const assistenteController = {
  async perguntar(request, response, next) {
    try {
      const resposta = await assistenteService.perguntar(request.body);
      response.json(resposta);
    } catch (error) {
      next(error);
    }
  },
};

export default assistenteController;
