import { Link, Outlet } from 'react-router'
import { useTema } from '../hooks/useTema'
import BarraNavegacao from './BarraNavegacao'
import Icone from './Icone'

export default function Layout() {
  const { tema, alternarTema } = useTema()

  return (
    <div className="min-h-dvh pb-24 md:pb-10">
      <header className="sticky top-0 z-[800] border-b border-line bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold tracking-tight text-pri">Vizi</span>
            <span className="hidden text-sm text-mut sm:inline">Quando falta, o bairro avisa</span>
          </Link>

          <div className="hidden md:block">
            <BarraNavegacao variante="topo" />
          </div>

          <button
            type="button"
            onClick={alternarTema}
            className="flex size-10 items-center justify-center rounded-full border border-line text-ink hover:bg-pri-l"
            aria-label={tema === 'escuro' ? 'Usar tema claro' : 'Usar tema escuro'}
          >
            <Icone nome={tema === 'escuro' ? 'sol' : 'lua'} />
          </button>
        </div>
      </header>

      <p className="bg-warnbg px-4 py-1.5 text-center text-xs font-semibold text-warn">
        Protótipo: todos os dados são simulados.
      </p>

      <main className="mx-auto max-w-6xl px-4 pt-4">
        <Outlet />
      </main>

      <footer className="mx-auto mt-10 hidden max-w-6xl px-4 text-xs text-mut md:block">
        Vizi · Global Solution FIAP 2026.2 · CitizenTech · Grupo Pentacode, turma 1ESPH.
      </footer>

      <BarraNavegacao />
    </div>
  )
}
