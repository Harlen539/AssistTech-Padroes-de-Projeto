import assert from 'node:assert/strict';
import test from 'node:test';
import { ChamadoStatusContext } from '../src/states/chamados/ChamadoStatusContext.js';

test('state avanca chamado aberto para em atendimento', () => {
  const chamado = {
    id: 1,
    status: 'Aberto',
    tecnico: 'Ana Beatriz',
    historico: [],
  };

  const atualizado = ChamadoStatusContext.from(chamado.status).avancar(chamado);

  assert.equal(atualizado.status, 'Em Atendimento');
  assert.equal(atualizado.historico.length, 1);
});

test('state avanca chamado resolvido para fechado', () => {
  const chamado = {
    id: 2,
    status: 'Resolvido',
    tecnico: 'Juliana Costa',
    historico: [],
  };

  const atualizado = ChamadoStatusContext.from(chamado.status).avancar(chamado);

  assert.equal(atualizado.status, 'Fechado');
});

test('state mantem chamado fechado sem novo historico', () => {
  const chamado = {
    id: 3,
    status: 'Fechado',
    tecnico: 'Joao Pereira',
    historico: [{ status: 'Fechado' }],
  };

  const atualizado = ChamadoStatusContext.from(chamado.status).avancar(chamado);

  assert.equal(atualizado.status, 'Fechado');
  assert.equal(atualizado.historico.length, 1);
});
