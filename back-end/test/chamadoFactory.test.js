import assert from 'node:assert/strict';
import test from 'node:test';
import { ChamadoFactory } from '../src/factories/chamados/ChamadoFactory.js';

test('factory cria chamado de rede com tecnico e prioridade padrao da categoria', () => {
  const chamado = ChamadoFactory.criar({
    titulo: 'VPN instavel',
    descricao: 'A VPN desconecta durante o trabalho remoto.',
    categoria: 'Rede',
    solicitante: 'Bruno Castro',
    anexos: [{ nome: 'erro.png', url: 'data:image/png;base64,abc' }],
  }, 99);

  assert.equal(chamado.id, 99);
  assert.equal(chamado.categoria, 'Rede');
  assert.equal(chamado.prioridade, 'Alta');
  assert.equal(chamado.tecnico, 'Marcos Vinicius');
  assert.equal(chamado.status, 'Aberto');
  assert.deepEqual(chamado.anexos, [{ nome: 'erro.png', url: 'data:image/png;base64,abc' }]);
});

test('factory rejeita categoria desconhecida', () => {
  assert.throws(() => ChamadoFactory.criar({
    titulo: 'Pedido generico',
    descricao: 'Sem categoria valida.',
    categoria: 'Outro',
  }, 100), /Categoria de chamado invalida/);
});
