import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes/AppRoutes';
import {
  chamadosMock,
  tecnicosMock,
  usuariosMock,
} from './data/mockData';
import {
  avancarStatusChamado,
  criarChamado,
  criarTecnico,
  criarUsuario,
  listarChamados,
  listarTecnicos,
  listarUsuarios,
} from './services/api';

const proximoStatus = {
  Aberto: 'Em Atendimento',
  'Em Atendimento': 'Resolvido',
  Resolvido: 'Fechado',
  Fechado: 'Fechado',
};

const tecnicoPorCategoria = {
  Hardware: 'Ana Beatriz',
  Software: 'João Pereira',
  Rede: 'Marcos Vinicius',
  Acesso: 'Juliana Costa',
};

function App() {
  const [chamados, setChamados] = useState(chamadosMock);
  const [usuarios, setUsuarios] = useState(usuariosMock);
  const [tecnicos, setTecnicos] = useState(tecnicosMock);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    let ativo = true;

    Promise.allSettled([listarChamados(), listarUsuarios(), listarTecnicos()]).then((resultados) => {
      if (!ativo) return;

      const [tickets, users, technicians] = resultados;
      if (tickets.status === 'fulfilled' && Array.isArray(tickets.value) && tickets.value.length) {
        setChamados(tickets.value);
      }
      if (users.status === 'fulfilled' && Array.isArray(users.value) && users.value.length) {
        setUsuarios(users.value);
      }
      if (technicians.status === 'fulfilled' && Array.isArray(technicians.value) && technicians.value.length) {
        setTecnicos(technicians.value);
      }
    });

    return () => {
      ativo = false;
    };
  }, []);

  async function adicionarChamado(dados) {
    const maiorId = chamados.reduce((maximo, chamado) => Math.max(maximo, Number(chamado.id) || 0), 0);
    const chamadoLocal = {
      id: maiorId + 1,
      prioridade: 'Média',
      status: 'Aberto',
      tecnico: tecnicoPorCategoria[dados.categoria] ?? 'A definir',
      atualizadoEm: 'Agora',
      ...dados,
    };
    setChamados((atuais) => [chamadoLocal, ...atuais]);

    try {
      const salvo = await criarChamado(dados);
      if (salvo?.id) {
        setChamados((atuais) =>
          atuais.map((chamado) => (chamado.id === chamadoLocal.id ? { ...chamadoLocal, ...salvo } : chamado)),
        );
      }
      return { offline: false };
    } catch {
      return { offline: true };
    }
  }

  async function avancarStatus(id) {
    setChamados((atuais) =>
      atuais.map((chamado) =>
        chamado.id === id ? { ...chamado, status: proximoStatus[chamado.status] ?? chamado.status } : chamado,
      ),
    );
    try {
      await avancarStatusChamado(id);
      return false;
    } catch {
      return true;
    }
  }

  async function adicionarUsuario(dados, idEmEdicao) {
    const novo = { id: idEmEdicao ?? Date.now(), ...dados };
    setUsuarios((atuais) => (
      idEmEdicao
        ? atuais.map((usuario) => (usuario.id === idEmEdicao ? novo : usuario))
        : [novo, ...atuais]
    ));
    if (idEmEdicao) return false;
    try {
      await criarUsuario(dados);
      return false;
    } catch {
      return true;
    }
  }

  function removerUsuario(id) {
    setUsuarios((atuais) => atuais.filter((usuario) => usuario.id !== id));
  }

  async function adicionarTecnico(dados, idEmEdicao) {
    const novo = { id: idEmEdicao ?? Date.now(), ...dados };
    setTecnicos((atuais) => (
      idEmEdicao
        ? atuais.map((tecnico) => (tecnico.id === idEmEdicao ? novo : tecnico))
        : [novo, ...atuais]
    ));
    if (idEmEdicao) return false;
    try {
      await criarTecnico(dados);
      return false;
    } catch {
      return true;
    }
  }

  function removerTecnico(id) {
    setTecnicos((atuais) => atuais.filter((tecnico) => tecnico.id !== id));
  }

  const contexto = {
    chamados,
    usuarios,
    tecnicos,
    adicionarChamado,
    avancarStatus,
    adicionarUsuario,
    removerUsuario,
    adicionarTecnico,
    removerTecnico,
    onMenuClick: () => setSidebarOpen(true),
  };

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && <button className="sidebar-overlay" aria-label="Fechar menu" onClick={() => setSidebarOpen(false)} />}
      <main className="workspace">
        <AppRoutes context={contexto} />
      </main>
    </div>
  );
}

export default App;
