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
import ChamadoTable from '../components/ChamadoTable';
import ChartCard from '../components/ChartCard';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import { buildChamadoMetrics } from '../utils/chamadoMetrics';

function renderPieLabel({ cx, cy, midAngle, innerRadius, outerRadius, payload }) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.56;
  const radians = (-midAngle * Math.PI) / 180;
  return (
    <text
      x={cx + radius * Math.cos(radians)}
      y={cy + radius * Math.sin(radians)}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      className="pie-label"
    >
      {payload.percent}
    </text>
  );
}

const categoriaCores = ['#2563eb', '#16a34a', '#f59e0b', '#7c3aed'];

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

function Dashboard({ chamados, onMenuClick }) {
  const { metricas, statusData, categoriaData } = buildChamadoMetrics(chamados);

  return (
    <>
      <Header
        title="Dashboard"
        subtitle="Visão geral do sistema"
        onMenuClick={onMenuClick}
      />
      <div className="dashboard-layout">
        <div className="dashboard-content">
          <section className="stats-grid" aria-label="Métricas dos chamados">
            {metricas.map((metrica) => <StatCard key={metrica.titulo} {...metrica} />)}
          </section>
          <section className="charts-grid">
            <ChartCard title="Chamados por Status">
              <div className="donut-area">
                <ResponsiveContainer width="52%" height={188}>
                  <PieChart>
                    <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={52} outerRadius={82} paddingAngle={3} labelLine={false} label={renderPieLabel} isAnimationActive={false}>
                      {statusData.map((item) => <Cell key={item.name} fill={item.color} />)}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} cursor={false} />
                  </PieChart>
                </ResponsiveContainer>
                <ul className="chart-legend">
                  {statusData.map((item) => (
                    <li key={item.name}>
                      <span style={{ backgroundColor: item.color }} />
                      {item.name} ({item.value})
                    </li>
                  ))}
                </ul>
              </div>
            </ChartCard>
            <ChartCard title="Chamados por Categoria">
              <ResponsiveContainer width="100%" height={188}>
                <BarChart data={categoriaData} margin={{ top: 24, left: 0, right: 8, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#eef3f8" strokeDasharray="3 5" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#667085', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8a96a8', fontSize: 12 }} allowDecimals={false} />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: '#f5f8fc' }} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} isAnimationActive={false}>
                    {categoriaData.map((item, index) => <Cell key={item.name} fill={categoriaCores[index % categoriaCores.length]} />)}
                    <LabelList dataKey="value" position="top" fill="#263548" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </section>
          <ChamadoTable chamados={chamados.slice(0, 6)} recente />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
