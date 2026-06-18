import { CalendarDays, Download } from 'lucide-react';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ChartCard from '../components/ChartCard';
import Header from '../components/Header';
import { buildChamadoMetrics } from '../utils/chamadoMetrics';

const periodoLabels = {
  all: 'Todos os dias',
  7: 'Últimos 7 dias',
  30: 'Últimos 30 dias',
};

const categoriaCores = ['#2563eb', '#16a34a', '#f59e0b', '#7c3aed'];
const tecnicoCores = ['#0f766e', '#2563eb', '#7c3aed', '#db2777'];

function renderPieLabel({ cx, cy, midAngle, innerRadius, outerRadius, payload }) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.56;
  const radians = (-midAngle * Math.PI) / 180;
  const x = cx + radius * Math.cos(radians);
  const y = cy + radius * Math.sin(radians);

  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" className="pie-label">
      {payload.percent}
    </text>
  );
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  const item = payload[0];
  return (
    <div className="chart-tooltip">
      <span>{label ?? item.name}</span>
      <strong>{item.value} chamado{item.value === 1 ? '' : 's'}</strong>
    </div>
  );
}

function DonutLegend({ data }) {
  return (
    <ul className="report-legend">
      {data.map((item) => (
        <li key={item.name}>
          <span style={{ backgroundColor: item.color }} />
          <label>{item.name}</label>
          <strong>{item.value} <small>({item.percent})</small></strong>
        </li>
      ))}
    </ul>
  );
}

function DonutReport({ data, total }) {
  return (
    <div className="report-donut-area">
      <div className="donut-graphic">
        <ResponsiveContainer width="100%" height={214}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={62}
              outerRadius={101}
              paddingAngle={3}
              labelLine={false}
              label={renderPieLabel}
              isAnimationActive={false}
            >
              {data.map((item) => <Cell key={item.name} fill={item.color} />)}
            </Pie>
            <Tooltip content={<ChartTooltip />} cursor={false} />
          </PieChart>
        </ResponsiveContainer>
        <span className="donut-center"><strong>{total}</strong><small>Total de<br />chamados</small></span>
      </div>
      <DonutLegend data={data} />
    </div>
  );
}

function Relatorios({ chamados, onMenuClick }) {
  const [periodo, setPeriodo] = useState('all');
  const {
    total,
    statusData,
    categoriaData,
    prioridadeData,
    tecnicosData,
  } = buildChamadoMetrics(chamados);

  function exportarRelatorio() {
    const linhas = [
      ['Indicador', 'Quantidade'],
      ...statusData.map((item) => [item.name, item.value]),
      ['Período', periodoLabels[periodo]],
    ];
    const csv = linhas.map((linha) => linha.join(';')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'relatorio-assisttech.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Header
        title="Relatórios"
        subtitle="Análises e indicadores de performance do atendimento"
        onMenuClick={onMenuClick}
      />
      <div className="page-content reports-page">
        <div className="report-toolbar">
          <label className="period-select">
            <CalendarDays />
            <select value={periodo} onChange={(event) => setPeriodo(event.target.value)}>
              <option value="all">Todos os dias</option>
              <option value="7">Últimos 7 dias</option>
              <option value="30">Últimos 30 dias</option>
            </select>
          </label>
          <button type="button" className="primary-button" onClick={exportarRelatorio}><Download /> Exportar Relatório</button>
        </div>
        <section className="report-grid">
          <ChartCard title="Chamados por Status" className="report-card" footer={<><span>Total de chamados no período</span><strong>{total}</strong></>}>
            <DonutReport data={statusData} total={total} />
          </ChartCard>
          <ChartCard title="Chamados por Categoria" className="report-card" footer={<><span>Total de chamados no período</span><strong>{total}</strong></>}>
            <ResponsiveContainer width="100%" height={222}>
              <BarChart data={categoriaData} margin={{ top: 28, right: 12, bottom: 8, left: 0 }}>
                <CartesianGrid vertical={false} stroke="#eef3f8" strokeDasharray="3 5" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#667085', fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#8a96a8', fontSize: 12 }} allowDecimals={false} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: '#f5f8fc' }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} isAnimationActive={false}>
                  {categoriaData.map((item, index) => <Cell key={item.name} fill={categoriaCores[index % categoriaCores.length]} />)}
                  <LabelList dataKey="value" position="top" fill="#253348" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Chamados por Prioridade" className="report-card" footer={<><span>Total de chamados no período</span><strong>{total}</strong></>}>
            <DonutReport data={prioridadeData} total={total} />
          </ChartCard>
          <ChartCard title="Técnicos com mais atendimentos" className="report-card" footer={<><span>Total de atendimentos no período</span><strong>{total}</strong></>}>
            <ResponsiveContainer width="100%" height={222}>
              <BarChart layout="vertical" data={tecnicosData} margin={{ top: 8, right: 44, bottom: 5, left: 22 }}>
                <CartesianGrid horizontal={false} stroke="#eef3f8" strokeDasharray="3 5" />
                <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: '#8a96a8', fontSize: 12 }} allowDecimals={false} />
                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tick={{ fill: '#667085', fontSize: 12 }} width={118} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: '#f5f8fc' }} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} isAnimationActive={false}>
                  {tecnicosData.map((item, index) => <Cell key={item.name} fill={tecnicoCores[index % tecnicoCores.length]} />)}
                  <LabelList dataKey="value" position="right" fill="#253348" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>
      </div>
    </>
  );
}

export default Relatorios;
