import { Link } from 'react-router'
import { linkDoAlerta } from '../domain/alertas'
import { formatarHaQuanto, formatarNumero } from '../domain/tempo'
import { SeloGravidade, SeloStatus } from './SeloStatus'
import SinalTipo from './SinalTipo'

// Cartão de um alerta (sensor) ou relato (morador) na lista e no destaque do mapa.
export default function AlertaCard({ alerta, destacado = false, aoPassarMouse }) {
  const ehSensor = alerta.fonte === 'sensor'

  return (
    <Link
      to={linkDoAlerta(alerta)}
      onMouseEnter={aoPassarMouse}
      onFocus={aoPassarMouse}
      className={`flex gap-3 rounded-2xl border bg-card p-3.5 transition hover:border-pri ${
        destacado ? 'border-pri ring-2 ring-pri/30' : 'border-line'
      }`}
    >
      <SinalTipo tipo={alerta.tipo} />
      <div className="min-w-0 flex-1">
        <p className="font-bold leading-tight">{alerta.titulo}</p>
        <p className="truncate text-sm text-mut">
          {alerta.local} · {formatarHaQuanto(alerta.desde)}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <SeloStatus status={alerta.status} />
          <SeloGravidade gravidade={alerta.gravidade} />
          {ehSensor && alerta.valor !== null && (
            <span className="text-xs font-semibold text-mut">
              {formatarNumero(alerta.valor)} {alerta.unidade}
            </span>
          )}
          {!ehSensor && (
            <span className="text-xs font-semibold text-mut">
              {alerta.confirmacoes ?? 0} {alerta.confirmacoes === 1 ? 'confirmação' : 'confirmações'}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
