import { NavLink } from 'react-router'
import Icone from './Icone'

const ITENS = [
  { para: '/', rotulo: 'Mapa', icone: 'mapa' },
  { para: '/avisar', rotulo: 'Avisar', icone: 'mais' },
  { para: '/bairro', rotulo: 'Bairro', icone: 'grafico' },
  { para: '/relatorio', rotulo: 'Relatório', icone: 'documento' },
]

// Mesma navegação em dois formatos: abas no rodapé (celular) e links no topo (telas largas).
export default function BarraNavegacao({ variante = 'abas' }) {
  if (variante === 'topo') {
    return (
      <nav aria-label="Principal" className="flex gap-1">
        {ITENS.map((item) => (
          <NavLink
            key={item.para}
            to={item.para}
            end={item.para === '/'}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                isActive ? 'bg-pri-l text-pri' : 'text-mut hover:bg-pri-l/60 hover:text-ink'
              }`
            }
          >
            <Icone nome={item.icone} className="size-4" />
            {item.rotulo}
          </NavLink>
        ))}
      </nav>
    )
  }

  return (
    <nav
      aria-label="Principal"
      className="fixed inset-x-0 bottom-0 z-[900] flex border-t border-line bg-card px-1 pt-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))] md:hidden"
    >
      {ITENS.map((item) => (
        <NavLink
          key={item.para}
          to={item.para}
          end={item.para === '/'}
          className={({ isActive }) =>
            `flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 text-[11px] ${
              isActive ? 'font-bold text-pri' : 'text-mut'
            }`
          }
        >
          <Icone nome={item.icone} className="size-6" />
          {item.rotulo}
        </NavLink>
      ))}
    </nav>
  )
}
