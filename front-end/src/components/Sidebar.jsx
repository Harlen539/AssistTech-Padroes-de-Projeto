import {
  BarChart3,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  LayoutGrid,
  PlusCircle,
  UserRoundCog,
  Users,
  X,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const atendimento = [
  { nome: 'Dashboard', rota: '/dashboard', icon: LayoutGrid },
  { nome: 'Chamados', rota: '/chamados', icon: ClipboardList },
  { nome: 'Novo Chamado', rota: '/novo-chamado', icon: PlusCircle },
];

const gestao = [
  { nome: 'Usuários', rota: '/usuarios', icon: Users },
  { nome: 'Técnicos', rota: '/tecnicos', icon: UserRoundCog },
  { nome: 'Relatórios', rota: '/relatorios', icon: BarChart3 },
];

function SidebarLink({ nome, rota, icon: Icon, onClose }) {
  return (
    <NavLink key={rota} to={rota} onClick={onClose} className={({ isActive }) => (isActive ? 'active' : '')}>
      <span className="nav-icon"><Icon /></span>
      <span>{nome}</span>
    </NavLink>
  );
}

function Sidebar({ open, onClose }) {
  return (
    <aside className={`sidebar ${open ? 'is-open' : ''}`}>
      <div className="brand">
        <img src="/assets/assisttech-logo.png" alt="AssistTech" className="sidebar-logo" />
        <button className="sidebar-close" type="button" onClick={onClose} aria-label="Fechar navegação">
          <X />
        </button>
      </div>
      <nav className="sidebar-nav" aria-label="Menu principal">
        <span className="nav-section-label">Atendimento</span>
        {atendimento.map((item) => <SidebarLink key={item.rota} {...item} onClose={onClose} />)}
        <span className="nav-section-label">Gestão</span>
        {gestao.map((item) => <SidebarLink key={item.rota} {...item} onClose={onClose} />)}
      </nav>
      <NavLink className="sidebar-footer" to="/central-ajuda" onClick={onClose}>
        <span className="nav-icon"><CircleHelp /></span>
        <span>Central de Ajuda</span>
        <ChevronRight />
      </NavLink>
    </aside>
  );
}

export default Sidebar;
