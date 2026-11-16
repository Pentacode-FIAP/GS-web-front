import { Link, Outlet } from 'react-router'
import { useTema } from '../hooks/useTema'
import BarraNavegacao from './BarraNavegacao'
import Icone from './Icone'

function Marca() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="Vizi, página inicial">
      <span className="flex size-8 items-center justify-center rounded-lg bg-pri text-on-pri">
        <Icone nome="local" className="size-5" />
      </span>
      <span className="leading-tight">
        <span className="block text-lg font-extrabold tracking-tight">Vizi</span>
        <span className="hidden text-xs whitespace-nowrap text-mut sm:block md:hidden lg:block">Quando falta, o bairro avisa</span>
      </span>
    </Link>
  )
}

export default function Layout() {
  const { tema, alternarTema } = useTema()

  return (
    <div className="flex min-h-dvh flex-col pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
      <a
        href="#conteudo"
        className="sr-only z-[1100] rounded-lg bg-pri px-4 py-2 font-bold text-on-pri focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Pular para o conteúdo
      </a>

      <header className="sticky top-0 z-[800] border-b border-line bg-card">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <Marca />

          <div className="hidden md:block">
            <BarraNavegacao variante="topo" />
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-md border border-line px-2 py-1 text-xs font-semibold whitespace-nowrap text-mut md:hidden lg:inline" title="Sensores e avisos são fictícios">
              Dados simulados
            </span>
            <button
              type="button"
              onClick={alternarTema}
              className="flex size-11 items-center justify-center rounded-lg text-ink hover:bg-bg"
              aria-label={tema === 'escuro' ? 'Usar tema claro' : 'Usar tema escuro'}
            >
              <Icone nome={tema === 'escuro' ? 'sol' : 'lua'} />
            </button>
          </div>
        </div>
      </header>

      <main id="conteudo" className="mx-auto w-full max-w-6xl min-w-0 flex-1 px-4 pt-5 pb-8">
        <Outlet />
      </main>

      <footer className="hidden border-t border-line md:block">
        <p className="mx-auto max-w-6xl px-4 py-5 text-sm text-mut">
          Vizi · Global Solution FIAP 2026.2 · CitizenTech · Grupo Pentacode, turma 1ESPH. Protótipo com dados
          simulados.
        </p>
      </footer>

      <BarraNavegacao />
    </div>
  )
}
