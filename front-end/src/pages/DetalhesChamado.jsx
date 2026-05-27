import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Flag,
  Headphones,
  MessageSquare,
  Tag,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import PersonAvatar from '../components/PersonAvatar';
import PriorityBadge from '../components/PriorityBadge';
import StatusBadge from '../components/StatusBadge';

const timelineIcons = {
  resolvido: CheckCircle2,
  atendimento: Headphones,
  pendente: Clock3,
  aberto: MessageSquare,
  sistema: Clock3,
};

const categoriaDetalhes = {
  Hardware: 'Equipamentos físicos',
  Software: 'Sistemas e aplicativos',
  Rede: 'Conectividade e acesso à rede',
  Acesso: 'Permissões e credenciais',
};

const prioridadeResposta = {
  Alta: 'Resposta em até 4 horas',
  Média: 'Resposta em até 8 horas',
  Baixa: 'Resposta em até 24 horas',
};

const statusHistorico = {
  Aberto: { tipo: 'aberto', texto: 'O chamado está aguardando o início do atendimento.' },
  'Em Atendimento': { tipo: 'atendimento', texto: 'O chamado foi atribuído e está em atendimento.' },
  Resolvido: { tipo: 'resolvido', texto: 'O chamado foi resolvido com sucesso.' },
  Fechado: { tipo: 'resolvido', texto: 'O chamado foi finalizado e encerrado.' },
};

function DetalhesChamado({ chamados, avancarStatus, onMenuClick }) {
  const { id } = useParams();
  const chamado = chamados.find((item) => String(item.id) === id) ?? chamados[0];
  const solicitante = chamado.solicitante ?? 'Colaborador não informado';
  const atualizacao = statusHistorico[chamado.status] ?? statusHistorico.Aberto;
  const historico = [
    { id: 'atual', status: chamado.status, data: chamado.atualizadoEm, texto: atualizacao.texto, responsavel: chamado.tecnico, tipo: atualizacao.tipo },
    { id: 'abertura', status: 'Abertura do Chamado', data: chamado.atualizadoEm, texto: 'Chamado registrado no sistema.', responsavel: solicitante, tipo: 'sistema' },
  ];

  async function atualizar() {
    await avancarStatus(chamado.id);
  }

  return (
    <>
      <Header
        title="Detalhes do Chamado"
        subtitle="Visualize e acompanhe as informações completas do chamado"
        onMenuClick={onMenuClick}
      />
      <div className="page-content details-page">
        <div className="detail-actions">
          <Link to="/chamados" className="outline-button"><ArrowLeft /> Voltar para chamados</Link>
          <button type="button" className="primary-button" onClick={atualizar}>Avançar Status <ArrowRight /></button>
        </div>
        <div className="details-grid">
          <section className="detail-card information-card">
            <h2>Informações do Chamado</h2>
            <div className="ticket-identity">
              <span className="identity-icon"><FileText /></span>
              <div>
                <strong>#{chamado.id}</strong>
                <h3>{chamado.titulo}</h3>
              </div>
            </div>
            <div className="ticket-tags">
              <span><FileText /> <small>Categoria</small><b>{chamado.categoria}</b></span>
              <span className="priority-tag"><Flag /> <small>Prioridade</small><PriorityBadge prioridade={chamado.prioridade} /></span>
              <span className="status-tag"><MessageSquare /> <small>Status</small><StatusBadge status={chamado.status} /></span>
            </div>
            <div className="ticket-description">
              <h3>Descrição</h3>
              <p>{chamado.descricao || 'Descrição não informada para este chamado.'}</p>
            </div>
            <div className="details-meta">
              <div className="person-info">
                <PersonAvatar name={solicitante} />
                <span><small>Usuário Solicitante</small><strong>{solicitante}</strong></span>
              </div>
              <div className="person-info">
                <PersonAvatar name={chamado.tecnico} />
                <span><small>Técnico Responsável</small><strong>{chamado.tecnico}</strong></span>
              </div>
              <div className="meta-info">
                <CalendarDays />
                <span><small>Atualizado em</small><strong>{chamado.atualizadoEm}</strong></span>
              </div>
              <div className="meta-info">
                <Tag />
                <span><small>Categoria</small><strong>{chamado.categoria}</strong><p>{categoriaDetalhes[chamado.categoria]}</p></span>
              </div>
              <div className="meta-info">
                <Clock3 />
                <span><small>Status Atual</small><strong>{chamado.status}</strong></span>
              </div>
              <div className="meta-info priority-meta">
                <Flag />
                <span><small>Prioridade</small><strong>{chamado.prioridade}</strong><p>{prioridadeResposta[chamado.prioridade]}</p></span>
              </div>
            </div>
          </section>
          <section className="detail-card history-card">
            <h2>Histórico do Chamado</h2>
            <ol className="timeline">
              {historico.map((evento) => {
                const Icon = timelineIcons[evento.tipo];
                return (
                  <li key={evento.id} className={evento.tipo}>
                    <span className="timeline-icon"><Icon /></span>
                    <div className="timeline-copy">
                      <div><strong>{evento.status}</strong><time>{evento.data}</time></div>
                      <p>{evento.texto}</p>
                      <small>{evento.responsavel}</small>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>
      </div>
    </>
  );
}

export default DetalhesChamado;
