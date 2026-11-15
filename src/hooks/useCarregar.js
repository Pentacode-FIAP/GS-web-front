import { useCallback, useEffect, useState } from 'react'

// Hook genérico de carregamento assíncrono: chama `buscar` ao montar (e quando `chave` muda)
// e devolve dados, estado de carregamento, erro e uma função para tentar de novo.
export function useCarregar(buscar, chave = '') {
  const [dados, setDados] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let cancelado = false // evita gravar resposta antiga se o componente saiu da tela
    setCarregando(true)
    setErro(null)

    buscar()
      .then((resultado) => {
        if (!cancelado) setDados(resultado)
      })
      .catch((e) => {
        if (!cancelado) setErro(e)
      })
      .finally(() => {
        if (!cancelado) setCarregando(false)
      })

    return () => {
      cancelado = true
    }
    // `buscar` muda a cada render; quem decide quando recarregar é `chave` e `tentativa`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chave, tentativa])

  const recarregar = useCallback(() => setTentativa((n) => n + 1), [])

  return { dados, setDados, carregando, erro, recarregar }
}
