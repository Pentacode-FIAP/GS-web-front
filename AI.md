# Uso de Inteligência Artificial no Projeto

Este documento descreve, de forma transparente, como a Inteligência Artificial foi utilizada durante o desenvolvimento do **Vizi**, projeto da Global Solution 2026.2 (tema CitizenTech) da FIAP.

---

## Ferramenta utilizada

| Item | Descrição |
|---|---|
| **Ferramenta** | Claude Code (Anthropic) |
| **Tipo** | Assistente de programação baseado em IA, executado no terminal e com acesso ao repositório do projeto |

---

## Onde a IA foi utilizada

### 1 Desenvolvimento da ideia

O Claude Code apoiou a fase de concepção do projeto, servindo como apoio para organizar e refinar as ideias do grupo:

- Brainstorm sobre o problema (monitoramento de chuvas/alagamentos e quedas de energia/internet em bairros) e sobre como cada disciplina se encaixaria na solução;
- Discussão da arquitetura geral: dispositivo ESP32 como fonte principal de dados, alimentando a CLI em Python e a aplicação web em React, além dos reportes feitos pelos cidadãos;
- Organização do escopo e priorização das funcionalidades para caber no prazo da entrega.

**Decisões humanas:** o tema, o nome do projeto, o problema a ser resolvido e o escopo final foram definidos pelo grupo. A IA sugeriu alternativas, mas a escolha final foi sempre dos integrantes.

### 2 Integração com API externa (MockAPI)

O grupo fez a integração com a **[MockAPI](https://mockapi.io)**, um serviço que hospeda uma API REST online. Nela fica o recurso `relatos`, com os avisos feitos pelos moradores, e o app faz o **CRUD completo** sobre ele. Os dados são fictícios, mas as requisições são reais: o app em produção conversa com a API pela internet.

**Como a integração funciona no app:**

| Operação | Requisição | Onde aparece no app |
|---|---|---|
| **Criar** | `POST /relatos` | Tela "Avisar um problema": o morador escolhe tipo, gravidade e lugar no mapa |
| **Consultar** | `GET /relatos` e `GET /relatos/:id` | Mapa, lista de avisos, tela do aviso, resumo do bairro e relatório |
| **Atualizar** | `PUT /relatos/:id` | Votos dos vizinhos ("Sim, ainda" / "Já voltou"), edição do aviso e encerramento |
| **Excluir** | `DELETE /relatos/:id` | Botão "Apagar aviso", disponível só para quem criou o aviso |

**Como a IA ajudou:**

- Montar o formato de cada relato com os mesmos campos dos alertas do sensor (definidos no projeto de Edge), para que a lista e o mapa mostrem os dois juntos sem tratamento especial;
- Organizar o acesso à API num único arquivo (`src/services/relatosService.js`), separado das telas, e um cliente HTTP (`src/services/http.js`) com tempo limite de 10 segundos e mensagens de erro em português ("Sem conexão com o servidor", "Não encontramos esse aviso"...);
- Tratar um comportamento específico da MockAPI: quando a lista está vazia, ela responde **404** em vez de uma lista vazia, e o app passou a tratar isso como "nenhum aviso";
- Evitar que um voto apague o de outro vizinho: antes de salvar um voto, o app busca a versão mais recente do aviso na API e só então aplica a mudança;
- Criar o script `npm run popular`, que cadastra relatos de exemplo na API (e `npm run popular -- --limpar` para apagar e recriar).

**Como foi feito e validado:** o recurso `relatos` foi criado no painel da MockAPI pela própria IA, usando a extensão Claude in Chrome a pedido do grupo. Em seguida, cada operação foi testada no app rodando: criar um aviso, editar a gravidade, votar até ele virar "Confirmado" e apagar. Depois de cada passo, a resposta foi conferida direto na URL da API. O grupo revisou o resultado e o código antes de aceitar. A MockAPI usada não exige chave nem senha, então nenhuma credencial foi compartilhada com a IA. A URL da API fica em `src/config.js` e pode ser trocada pela variável de ambiente `VITE_API_URL`.

**Observação:** os dados dos sensores Vizi **não** vêm da MockAPI. Nesta entrega eles são simulados dentro do próprio app, seguindo o mesmo formato da API do projeto de Edge, porque o back-end com FIWARE não fica no ar para a correção.

### 3 Prototipação visual

O Claude Code gerou um **protótipo visual** das telas da aplicação para servir de base para o desenvolvimento real:

- Esboço das principais telas `[ex.: mapa do bairro, painel de alertas, formulário de reporte do cidadão]`;
- Definição inicial de layout, hierarquia de informações e navegação.

**Importante:** o protótipo foi usado como **referência e ponto de partida**, não como produto final. A implementação definitiva foi feita pelo grupo a partir dele, com as adaptações necessárias.

### 4 Revisão de erros e bugs

Durante o desenvolvimento, a IA foi usada como apoio na depuração:

- Análise de mensagens de erro e stack traces;
- Identificação de possíveis causas de bugs e sugestão de correções;
- Revisão de trechos de código em busca de problemas de lógica, casos não tratados e más práticas.

**Validação humana:** nenhuma correção foi aplicada sem que o grupo entendesse o problema e a solução proposta. As correções foram testadas antes de entrar na versão final.

---
