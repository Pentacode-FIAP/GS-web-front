import { GRAVIDADES, STATUS } from '../domain/tipos'

const TONS = {
  ok: 'bg-okbg text-ok',
  warn: 'bg-warnbg text-warn',
  bad: 'bg-badbg text-bad',
  neutro: 'bg-line text-mut',
}

function Selo({ tom, children }) {
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${TONS[tom]}`}>{children}</span>
}

export function SeloStatus({ status }) {
  const info = STATUS[status] ?? { rotulo: status, tom: 'neutro' }
  return <Selo tom={info.tom}>{info.rotulo}</Selo>
}

export function SeloGravidade({ gravidade }) {
  const tom = gravidade === 'alta' ? 'bad' : gravidade === 'media' ? 'warn' : 'neutro'
  return <Selo tom={tom}>Gravidade {GRAVIDADES[gravidade]?.rotulo.toLowerCase() ?? gravidade}</Selo>
}

export function SeloFonte({ fonte }) {
  return <Selo tom="neutro">{fonte === 'sensor' ? 'Sensor Vizi' : 'Aviso de morador'}</Selo>
}
