import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

function Pagination({ summary, pages = ['1', '2', '3'], withPageSize = false, onPageChange, onPageSizeChange }) {
  const selecionaveis = pages.filter((page) => page !== '...');
  const [pagina, setPagina] = useState(selecionaveis[0] || '1');

  function selecionar(novaPagina) {
    if (novaPagina === '...') return;
    setPagina(novaPagina);
    onPageChange?.(novaPagina);
  }

  function mover(direcao) {
    const indice = selecionaveis.indexOf(pagina);
    const proximo = selecionaveis[indice + direcao];
    if (proximo) selecionar(proximo);
  }

  return (
    <div className="pagination">
      <span>{summary}</span>
      <div className="page-controls">
        <button type="button" onClick={() => mover(-1)} disabled={pagina === selecionaveis[0]} aria-label="Página anterior"><ChevronLeft /></button>
        {pages.map((page) => (
          <button type="button" key={page} className={page === pagina ? 'selected' : ''} onClick={() => selecionar(page)} disabled={page === '...'}>{page}</button>
        ))}
        <button type="button" onClick={() => mover(1)} disabled={pagina === selecionaveis[selecionaveis.length - 1]} aria-label="Próxima página"><ChevronRight /></button>
      </div>
      {withPageSize && (
        <select className="page-size" aria-label="Itens por página" defaultValue="12" onChange={(event) => onPageSizeChange?.(event.target.value)}>
          <option value="12">12 por página</option>
          <option value="24">24 por página</option>
        </select>
      )}
    </div>
  );
}

export default Pagination;
