// Acesso aos dados dos sensores Vizi.
//
// Nesta entrega (Front-end e Web Development) os sensores são SIMULADOS: as funções abaixo
// leem a imitação da API Vizi em ./mock/apiViziFake.js. Para a entrega de Edge, basta trocar
// o corpo de cada função por uma chamada à API real, por exemplo:
//   listarSensores = () => requisitar(`${API_VIZI_URL}/api/sensores`)
// Hooks e telas continuam iguais, porque o formato dos dados é o mesmo (docs/contrato-dados.md).
import { ErroApi } from './http'
import { getAlerta, getAlertas, getSensores } from './mock/apiViziFake'

// Pequena espera para o app se comportar como se houvesse rede (mostra o estado "carregando").
const LATENCIA_FAKE_MS = 350
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function listarSensores() {
  await esperar(LATENCIA_FAKE_MS)
  return getSensores()
}

export async function listarAlertasSensor() {
  await esperar(LATENCIA_FAKE_MS)
  return getAlertas()
}

export async function buscarAlertaSensor(id) {
  await esperar(LATENCIA_FAKE_MS)
  const alerta = getAlerta(id)
  // Igual à API real: 404 quando o serviço já voltou ao normal.
  if (!alerta) throw new ErroApi('Esse alerta não está mais ativo: o serviço voltou ao normal.', 404)
  return alerta
}
