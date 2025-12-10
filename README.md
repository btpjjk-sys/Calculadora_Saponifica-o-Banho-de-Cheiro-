# Calculadora de Saponificacao

**Status:** Em Desenvolvimento (Frontend Funcional)
**Licenca:** MIT
**Tecnologias:** TypeScript, React, Tailwind CSS

Uma aplicacao web moderna e responsiva desenvolvida para saboeiros artesanais. Esta ferramenta permite criar, configurar e validar receitas de sabao com precisao cientifica, calculando as quantidades exatas de base (NaOH ou KOH) e agua, alem de prever as propriedades finais do sabonete (dureza, limpeza, hidratacao, etc.).

## Indice

- [Sobre o Projeto](#sobre-o-projeto)
- [Status de Desenvolvimento e Roadmap](#status-de-desenvolvimento-e-roadmap)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura e Estrutura](#arquitetura-e-estrutura)
- [Pre-requisitos](#pre-requisitos)
- [Instalacao e Execucao](#instalacao-e-execucao)
- [Como Compilar (Build)](#como-compilar-build)
- [Logica de Negocio](#logica-de-negocio)

---

## Sobre o Projeto

A **Calculadora de Saponificacao** visa simplificar a quimica por tras da saboaria artesanal. Diferente de calculadoras simples, este projeto foca na experiencia do usuario (UX) e na visualizacao clara dos dados. O sistema utiliza uma base de dados de oleos com indices de saponificacao reais para garantir a seguranca e qualidade do produto final.

---

## Status de Desenvolvimento e Roadmap

Atualmente, a aplicacao funciona perfeitamente como uma ferramenta de calculo no lado do cliente (Client-Side), mas a infraestrutura de backend esta preparada para expansao.

### O que esta pronto:
- **Logica de Calculo:** Implementada e funcional no Frontend (`soapLogic.ts`).
- **Interface (UI):** Completa, responsiva e com feedback visual de atributos.
- **Estrutura Backend:** Servidor Express configurado com TypeScript.
- **ORM Setup:** Drizzle ORM e Schemas definidos para PostgreSQL.

### O que falta implementar (Roadmap):
- **Persistencia de Dados:** O sistema atual utiliza armazenamento em memoria (`MemStorage`). O proximo passo e conectar ao PostgreSQL para salvar usuarios e receitas permanentemente.
- **Autenticacao:** Implementar rotas de login/registro no servidor para permitir que saboeiros salvem seus historicos (esqueleto em `routes.ts`).
- **API de Receitas:** Criar endpoints REST para salvar e listar as receitas criadas.

---

## Funcionalidades

- **Selecao de Oleos:** Banco de dados integrado com oleos comuns (Azeite, Coco, Palma, Ricino, etc.).
- **Configuracao da Receita:**
  - Escolha entre bases NaOH (Soda Caustica) ou KOH (Potassa).
  - Ajuste de Sobregordura (Superfat).
  - Definicao da Pureza da Base.
  - Controle da Proporcao de Agua.
- **Dashboard de Resultados:** Calculo instantaneo do peso total da massa, quantidade de base e agua.
- **Analise de Atributos:** Visualizacao grafica das propriedades do sabao (Dureza, Limpeza, Hidratacao, Espuma, Persistencia, Solubilidade e Secagem).
- **Indicadores Visuais de Qualidade:** Cores automaticas (Verde/Amarelo/Vermelho) indicando se os atributos estao dentro das faixas ideais.
- **Interface Responsiva:** Design otimizado tanto para Desktop quanto para Mobile.

## Tecnologias Utilizadas

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Linguagem:** TypeScript
- **Estilizacao:** Tailwind CSS
- **Componentes UI:** shadcn/ui (baseado em Radix UI)
- **Icones:** Lucide React
- **Gerenciamento de Estado/Data:** TanStack Query
- **Roteamento:** Wouter

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Banco de Dados (ORM):** Drizzle ORM (PostgreSQL)
- **Validacao:** Zod

---

## Arquitetura e Estrutura

O projeto segue uma estrutura moderna de monorepo simplificado, onde frontend e backend coabitam, mas com responsabilidades separadas.

```bash
├── client/                 # Aplicacao Frontend (React)
│   ├── src/
│   │   ├── components/     # Componentes Reutilizaveis (UI, Dashboards)
│   │   ├── hooks/          # Hooks personalizados (ex: use-mobile)
│   │   ├── lib/            # Logica central (soapLogic.ts, utils)
│   │   ├── pages/          # Paginas da aplicacao
│   │   └── App.tsx         # Ponto de entrada do React
│   └── index.html
│
├── server/                 # Aplicacao Backend (Express)
│   ├── index.ts            # Ponto de entrada do servidor
│   ├── routes.ts           # Definicao de rotas da API
│   └── storage.ts          # Interface de armazenamento de dados
│
├── shared/                 # Codigo compartilhado (Tipos e Schemas do Drizzle)
│   └── schema.ts
│
├── script/                 # Scripts de utilidade (Build)
└── drizzle.config.ts       # Configuracao do ORM
````

## Pre-requisitos

Antes de comecar, certifique-se de ter instalado em sua maquina:

  - Node.js (Versao 18 ou superior recomendada)
  - NPM ou Yarn

## Instalacao e Execucao

1.  **Clone o repositorio:**

    ```bash
    git clone [https://github.com/seu-usuario/calculadora-saponificacao.git](https://github.com/seu-usuario/calculadora-saponificacao.git)
    cd calculadora-saponificacao
    ```

2.  **Instale as dependencias:**

    ```bash
    npm install
    ```

3.  **Configure as variaveis de ambiente:**
    Se necessario, configure o `DATABASE_URL` para o PostgreSQL no arquivo `.env` ou nas variaveis do sistema (para execucao local simples, o storage em memoria pode ser usado dependendo da configuracao do `storage.ts`).

4.  **Execute em modo de desenvolvimento:**
    Este comando inicia tanto o servidor backend quanto o frontend via Vite.

    ```bash
    npm run dev
    ```

    Acesse a aplicacao em: `http://localhost:5000`

## Como Compilar (Build)

Para gerar a versao de producao otimizada:

1.  Execute o script de build:

    ```bash
    npm run build
    ```

    *Isso ira transpilar o backend e gerar o bundle estatico do frontend na pasta `dist/`.*

2.  Para iniciar a versao de producao:

    ```bash
    npm start
    ```

## Logica de Negocio

A logica principal encontra-se em `client/src/lib/soapLogic.ts`. O sistema utiliza programacao orientada a objetos para garantir integridade nos calculos:

  - **Classe Oleo:** Armazena os indices de saponificacao (SAP) para NaOH e KOH e os atributos intrinsecos do oleo.
  - **Classe AtributosSabonete:** Define as 7 qualidades do sabao.
  - **Calculo Ponderado:** O sistema calcula a media ponderada dos atributos baseada na porcentagem de cada oleo na receita total.
  - **Algoritmo de Cor (Cor\_Oleo\_Atributo):**
      - **Verde (10):** Valor Ideal.
      - **Amarelo (5-9 ou 11-15):** Aceitavel.
      - **Vermelho (\<5 ou \>15):** Fora do ideal/atencao necessaria.

<!-- end list -->

```
```
