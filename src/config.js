// Configuração central. Pode ser sobrescrita por variáveis de ambiente do Vite (.env).

// API externa (MockAPI.io) com o CRUD dos relatos de morador.
export const API_RELATOS_URL =
  import.meta.env?.VITE_API_URL ?? 'https://6afa2d6b730c1d152f3209b1.mockapi.io/api/v1'

// Bairro e centro do mapa (Campo Limpo, zona sul de São Paulo).
export const BAIRRO = {
  nome: 'Campo Limpo',
  cidade: 'São Paulo',
  centro: { lat: -23.6465, lng: -46.7615 },
  zoom: 15,
}

// Regras de negócio da validação comunitária (iguais ao protótipo).
export const REGRAS = {
  confirmacoesParaConfirmar: 2, // "Se mais 2 vizinhos confirmarem, ele fica marcado como confirmado"
  negacoesParaResolver: 3, // 3 vizinhos dizendo "Já voltou" (e mais negações que confirmações) encerram o aviso
  diasDoResumo: 30, // janela da tela Bairro e do Relatório
}
