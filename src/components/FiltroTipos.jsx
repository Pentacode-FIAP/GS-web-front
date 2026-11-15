import { FILTROS_MAPA, infoTipo } from '../domain/tipos'
import Icone from './Icone'

// Chips de filtro do mapa ("Todos", "Energia", "Sinal"...), com a quantidade de cada tipo.
export default function FiltroTipos({ selecionado, aoSelecionar, contagem = {}, total = 0 }) {
  return (
    <div role="group" aria-label="Filtrar por tipo" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
      {FILTROS_MAPA.map((tipo) => {
        const ativo = selecionado === tipo
        const rotulo = tipo === 'todos' ? 'Todos' : infoTipo(tipo).rotulo
        const quantidade = tipo === 'todos' ? total : (contagem[tipo] ?? 0)
        return (
          <button
            key={tipo}
            type="button"
            aria-pressed={ativo}
            onClick={() => aoSelecionar(tipo)}
            className={`flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border px-3 text-sm font-semibold transition-colors ${
              ativo ? 'border-pri bg-pri text-on-pri' : 'border-line bg-card text-ink hover:border-pri'
            }`}
          >
            <Icone nome={tipo === 'todos' ? 'todos' : infoTipo(tipo).icone} className="size-4" />
            {rotulo}
            <span className={`text-xs ${ativo ? 'opacity-80' : 'text-mut'}`}>{quantidade}</span>
          </button>
        )
      })}
    </div>
  )
}
