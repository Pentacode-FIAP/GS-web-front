import { useState } from 'react'
import AlertaCard from '../components/AlertaCard'
import Botao from '../components/Botao'
import { Carregando, Erro, Vazio } from '../components/Estados'
import FiltroTipos from '../components/FiltroTipos'
import Icone from '../components/Icone'
import MapaBairro from '../components/MapaBairro'
import { BAIRRO } from '../config'
import { useAlertas } from '../hooks/useAlertas'

export default function Mapa() {
  const { alertas, total, contagem, tipo, setTipo, busca, setBusca, carregando, erroSensores, erroRelatos, recarregar } =
    useAlertas()
  const [destacadoId, setDestacadoId] = useState(null)

  // Sem escolha do usuário, destaca o primeiro da lista (o mais grave e recente).
  const idEmDestaque = alertas.some((a) => a.id === destacadoId) ? destacadoId : alertas[0]?.id

  return (
    <>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            {BAIRRO.nome}, {BAIRRO.cidade}
          </h1>
          <p className="text-sm text-mut">
            {carregando ? 'Buscando avisos…' : `${total} ${total === 1 ? 'aviso ativo' : 'avisos ativos'} no bairro agora`}
          </p>
        </div>
        <Botao para="/avisar" className="hidden md:inline-flex">
          <Icone nome="mais" />
          Avisar um problema
        </Botao>
      </div>

      <label className="mb-3 flex items-center gap-2 rounded-xl border border-line bg-card px-3 focus-within:border-pri">
        <Icone nome="busca" className="size-4 text-mut" />
        <span className="sr-only">Buscar rua ou tipo de problema</span>
        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar rua ou problema"
          className="min-h-11 w-full bg-transparent text-[15px] outline-none placeholder:text-mut"
        />
      </label>

      <FiltroTipos selecionado={tipo} aoSelecionar={setTipo} contagem={contagem} total={total} />

      {erroRelatos && (
        <div className="mt-3">
          <Erro
            compacto
            erro={{ message: `Os avisos de moradores não carregaram. ${erroRelatos.message}` }}
            aoTentarDeNovo={recarregar}
          />
        </div>
      )}
      {erroSensores && (
        <div className="mt-3">
          <Erro compacto erro={erroSensores} aoTentarDeNovo={recarregar} />
        </div>
      )}

      <div className="mt-3 grid gap-4 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="relative">
          <MapaBairro
            alertas={alertas}
            destacadoId={idEmDestaque}
            aoDestacar={setDestacadoId}
            className="h-[48vh] md:h-[68vh]"
          />
          <Botao para="/avisar" className="absolute top-3 right-3 z-[500] min-h-10 rounded-full py-2 shadow-lg md:hidden">
            <Icone nome="mais" className="size-4" />
            Avisar
          </Botao>
          <p className="mt-2 text-xs text-mut">
            Pino redondo: aviso de morador. Pino quadrado: sensor Vizi no poste. Toque no pino para destacar e de novo
            para abrir.
          </p>
        </div>

        <section aria-labelledby="titulo-lista" className="md:max-h-[68vh] md:overflow-y-auto md:pr-1">
          <h2 id="titulo-lista" className="mb-2 text-sm font-bold text-mut uppercase">
            Avisos no bairro
          </h2>
          {carregando && alertas.length === 0 ? (
            <Carregando texto="Buscando avisos…" />
          ) : alertas.length === 0 ? (
            <Vazio titulo="Nenhum aviso por aqui">
              {busca || tipo !== 'todos' ? 'Tente outro filtro ou outra busca.' : 'Tudo funcionando no bairro agora.'}
            </Vazio>
          ) : (
            <ul className="flex flex-col gap-2.5">
              {alertas.map((alerta) => (
                <li key={alerta.id}>
                  <AlertaCard
                    alerta={alerta}
                    destacado={alerta.id === idEmDestaque}
                    aoPassarMouse={() => setDestacadoId(alerta.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  )
}
