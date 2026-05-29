import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 2500,
});

export const listarChamados = () => api.get('/chamados').then((response) => response.data);
export const buscarChamadoPorId = (id) => api.get(`/chamados/${id}`).then((response) => response.data);
export const criarChamado = (dados) => api.post('/chamados', dados).then((response) => response.data);
export const avancarStatusChamado = (id) => api.put(`/chamados/${id}/status`).then((response) => response.data);
export const listarUsuarios = () => api.get('/usuarios').then((response) => response.data);
export const criarUsuario = (dados) => api.post('/usuarios', dados).then((response) => response.data);
export const listarTecnicos = () => api.get('/tecnicos').then((response) => response.data);
export const criarTecnico = (dados) => api.post('/tecnicos', dados).then((response) => response.data);
export const perguntarAssistente = (dados) => api.post('/assistente/perguntar', dados, { timeout: 30000 }).then((response) => response.data);

export default api;
