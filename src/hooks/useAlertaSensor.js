import { buscarAlertaSensor } from '../services/sensoresService'
import { useCarregar } from './useCarregar'

// Detalhe de um alerta de sensor (linha do tempo + série do gráfico).
export function useAlertaSensor(id) {
  const { dados: alerta, carregando, erro, recarregar } = useCarregar(() => buscarAlertaSensor(id), id)
  return { alerta, carregando, erro, recarregar }
}
