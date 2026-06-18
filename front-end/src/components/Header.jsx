import { Bell, ChevronDown, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ title, subtitle, onMenuClick }) {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');
  const [notificacoesAbertas, setNotificacoesAbertas] = useState(false);
  const [perfilAberto, setPerfilAberto] = useState(false);

  function pesquisar(event) {
    event.preventDefault();
    const termo = busca.trim();
    navigate(termo ? `/chamados?busca=${encodeURIComponent(termo)}` : '/chamados');
  }

  return (
    <header className="header">
      <button type="button" className="menu-toggle" onClick={onMenuClick} aria-label="Abrir navegação">
        <Menu />
      </button>
      <div className="page-heading">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <form className="header-search" onSubmit={pesquisar}>
        <Search size={18} />
        <input
          aria-label="Buscar no sistema"
          type="search"
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
          placeholder="Buscar chamados, usuários, técnicos..."
        />
      </form>
      <div className="header-action-wrap">
        <button
          type="button"
          className="notification"
          onClick={() => {
            setNotificacoesAbertas((aberto) => !aberto);
            setPerfilAberto(false);
          }}
          aria-label="3 notificações pendentes"
          aria-expanded={notificacoesAbertas}
        >
          <Bell />
          <span>3</span>
        </button>
        {notificacoesAbertas && (
          <div className="header-popover notifications-popover">
            <strong>Notificações</strong>
            <button type="button" onClick={() => navigate('/chamados/1')}>#1 em atendimento</button>
            <button type="button" onClick={() => navigate('/chamados')}>2 chamados aguardam revisão</button>
          </div>
        )}
      </div>
      <div className="header-action-wrap">
        <button
          type="button"
          className="profile"
          onClick={() => {
            setPerfilAberto((aberto) => !aberto);
            setNotificacoesAbertas(false);
          }}
          aria-expanded={perfilAberto}
        >
          <span className="avatar">CS</span>
          <span className="profile-copy">
            <strong>Carlos Silva</strong>
            <small>Administrador</small>
          </span>
          <ChevronDown size={16} />
        </button>
        {perfilAberto && (
          <div className="header-popover profile-popover">
            <button type="button" onClick={() => navigate('/usuarios')}>Gerenciar usuários</button>
            <button type="button" onClick={() => navigate('/dashboard')}>Voltar ao dashboard</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
