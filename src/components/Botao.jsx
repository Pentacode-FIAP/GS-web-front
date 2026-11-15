import { Link } from 'react-router'

const VARIANTES = {
  primario: 'bg-pri text-on-pri hover:bg-pri-d',
  secundario: 'bg-pri-l text-pri hover:brightness-95',
  contorno: 'border-[1.5px] border-line text-ink hover:bg-pri-l/50',
  perigo: 'border-[1.5px] border-bad/40 text-bad hover:bg-badbg',
}

// Botão padrão do app. Com `para`, vira link de navegação com a mesma aparência.
export default function Botao({ variante = 'primario', para, className = '', children, ...props }) {
  const classes = `inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 py-3 text-[15px] font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTES[variante]} ${className}`

  if (para) {
    return (
      <Link to={para} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
