import { infoTipo } from '../domain/tipos'
import Icone from './Icone'

// Círculo colorido com o ícone do tipo (energia, sinal, água...).
export default function SinalTipo({ tipo, tamanho = 'md' }) {
  const info = infoTipo(tipo)
  const classes = tamanho === 'lg' ? 'size-12 [&_svg]:size-6' : 'size-9 [&_svg]:size-5'
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full text-card ${classes}`}
      style={{ backgroundColor: info.cor }}
    >
      <Icone nome={info.icone} titulo={info.rotulo} />
    </span>
  )
}
