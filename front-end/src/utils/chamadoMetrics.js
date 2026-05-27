const statusConfig = [
  { status: 'Aberto', name: 'Abertos', tipo: 'aberto', color: '#1472ed' },
  { status: 'Em Atendimento', name: 'Em Atendimento', tipo: 'atendimento', color: '#ffb613' },
  { status: 'Resolvido', name: 'Resolvidos', tipo: 'resolvido', color: '#24b967' },
  { status: 'Fechado', name: 'Fechados', tipo: 'fechado', color: '#99a5b5' },
];

const categoriaConfig = ['Hardware', 'Software', 'Rede', 'Acesso'];

const prioridadeConfig = [
  { name: 'Alta', color: '#ef4444' },
  { name: 'Média', color: '#ffb613' },
  { name: 'Baixa', color: '#24b967' },
];

function formatarPercentual(valor, total) {
  if (!total) return '0,0%';
  return `${((valor / total) * 100).toFixed(1).replace('.', ',')}%`;
}

function contarPor(chamados, campo, valor) {
  return chamados.filter((chamado) => chamado[campo] === valor).length;
}

export function buildChamadoMetrics(chamados) {
  const total = chamados.length;
  const statusData = statusConfig.map((item) => {
    const value = contarPor(chamados, 'status', item.status);
    return { ...item, value, percent: formatarPercentual(value, total) };
  });

  const categoriaData = categoriaConfig.map((name) => ({
    name,
    value: contarPor(chamados, 'categoria', name),
  }));

  const prioridadeData = prioridadeConfig.map((item) => {
    const value = contarPor(chamados, 'prioridade', item.name);
    return { ...item, value, percent: formatarPercentual(value, total) };
  });

  const tecnicosData = Object.entries(
    chamados.reduce((contagem, chamado) => {
      contagem[chamado.tecnico] = (contagem[chamado.tecnico] ?? 0) + 1;
      return contagem;
    }, {}),
  )
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value || a.name.localeCompare(b.name));

  const metricas = [
    { titulo: 'Total de Chamados', valor: total, detalhe: '100% do total', tipo: 'total' },
    ...statusData.map((item) => ({
      titulo: item.name,
      valor: item.value,
      detalhe: `${item.percent} do total`,
      tipo: item.tipo,
    })),
  ];

  return {
    total,
    metricas,
    statusData,
    categoriaData,
    prioridadeData,
    tecnicosData,
  };
}
