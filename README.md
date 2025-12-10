# Calculadora de Saponificação

**Status:** Em Desenvolvimento (Frontend Funcional)
**Tecnologias:** TypeScript, React, Tailwind CSS

Uma aplicação web moderna e responsiva desenvolvida para saboeiros artesanais. Esta ferramenta permite criar, configurar e validar receitas de sabão com precisão científica, calculando as quantidades exatas de base (NaOH ou KOH) e água, além de prever as propriedades finais do sabonete (dureza, limpeza, hidratação, etc.).

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Status de Desenvolvimento e Roadmap](#status-de-desenvolvimento-e-roadmap)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura e Estrutura](#arquitetura-e-estrutura)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Como Compilar (Build)](#como-compilar-build)
- [Lógica da Calculadora](#lógica-da-calculadora)

---

## Sobre o Projeto

A **Calculadora de Saponificação** visa simplificar a química por trás da saboaria artesanal. Diferente de calculadoras simples, este projeto foca na experiência do usuário (UX) e na visualização clara dos dados. O sistema utiliza uma base de dados de óleos com índices de saponificação reais para garantir a segurança e qualidade do produto final.

---

## Status de Desenvolvimento e Roadmap

Atualmente, a aplicação funciona perfeitamente como uma ferramenta de cálculo no lado do cliente (Client-Side), mas a infraestrutura de backend está preparada para expansão.

### O que está pronto:
- **Lógica de Cálculo:** Implementada e funcional no Frontend (`soapLogic.ts`).
- **Interface (UI):** Completa, responsiva e com feedback visual de atributos.
- **Estrutura Backend:** Servidor Express configurado com TypeScript.
- **ORM Setup:** Drizzle ORM e Schemas definidos para PostgreSQL.

### O que falta implementar:
- **Persistência de Dados:** O sistema atual utiliza armazenamento em memória (`MemStorage`). O próximo passo é conectar ao PostgreSQL para salvar usuários e receitas permanentemente.
- **Autenticação:** Implementar rotas de login/registro no servidor para permitir que saboeiros salvem seus históricos (esqueleto em `routes.ts`).
- **API de Receitas:** Criar endpoints REST para salvar e listar as receitas criadas.

---

## Funcionalidades

- **Seleção de Óleos:** Banco de dados integrado com óleos comuns (Azeite, Coco, Palma, Ricino, etc.).
- **Configuração da Receita:**
  - Escolha entre bases NaOH (Soda Cáustica) ou KOH (Potassa).
  - Ajuste de Sobre Gordura (Superfat).
  - Definição da Pureza da Base.
  - Controle da Proporção de Água.
- **Dashboard de Resultados:** Cálculo instantâneo do peso total da massa, quantidade de base e água.
- **Análise de Atributos:** Visualização gráfica das propriedades do sabão (Dureza, Limpeza, Hidratação, Espuma, Persistente, Solubilidade e Secagem).
- **Indicadores Visuais de Qualidade:** Cores automáticas (Verde/Amarelo/Vermelho) indicando se os atributos estão dentro das faixas ideais.
- **Interface Responsiva:** Design otimizado tanto para Desktop quanto para Mobile.

## Tecnologias Utilizadas

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Componentes UI:** shadcn/ui (baseado em Radix UI)
- **Ícones:** Lucide React
- **Gerenciamento de Estado/Data:** TanStack Query
- **Roteamento:** Wouter

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Banco de Dados (ORM):** Drizzle ORM (PostgreSQL)
- **Validação:** Zod

---

## Arquitetura e Estrutura

O projeto segue uma estrutura moderna de monorepo simplificado, onde frontend e backend coabitam, mas com responsabilidades separadas.

```bash
├── client/                 # Aplicação Frontend (React)
│   ├── src/
│   │   ├── components/     # Componentes Reutilizáveis (UI, Dashboards)
│   │   ├── hooks/          # Hooks personalizados (ex: use-mobile)
│   │   ├── lib/            # Lógica central (soapLogic.ts, utils)
│   │   ├── pages/          # Páginas da aplicação
│   │   └── App.tsx         # Ponto de entrada do React
│   └── index.html
│
├── server/                 # Aplicação Backend (Express)
│   ├── index.ts            # Ponto de entrada do servidor
│   ├── routes.ts           # Definição de rotas da API
│   └── storage.ts          # Interface de armazenamento de dados
│
├── shared/                 # Código compartilhado (Tipos e Schemas do Drizzle)
│   └── schema.ts
│
├── script/                 # Scripts de utilidade (Build)
└── drizzle.config.ts       # Configuração do ORM
````

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

  - Node.js (Versão 18 ou superior recomendada)
  - NPM ou Yarn

## Instalação e Execução

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/seu-usuario/calculadora-saponificacao.git](https://github.com/seu-usuario/calculadora-saponificacao.git)
    cd calculadora-saponificacao
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Se necessário, configure o `DATABASE_URL` para o PostgreSQL no arquivo `.env` ou nas variáveis do sistema (para execução local simples, o storage em memória pode ser usado dependendo da configuração do `storage.ts`).

4.  **Execute em modo de desenvolvimento:**
    Este comando inicia tanto o servidor backend quanto o frontend via Vite.

    ```bash
    npm run dev
    ```

    Acesse a aplicação em: `http://localhost:5000`

## Como Compilar (Build)

Para gerar a versao de produção otimizada:

1.  Execute o script de build:

    ```bash
    npm run build
    ```

    *Isso irá compilar o backend e gerar o bundle estático do frontend na pasta `dist/`.*

2.  Para iniciar a versão de produção:

    ```bash
    npm start
    ```

## Lógica da Calculadora

A lógica principal encontra-se em `client/src/lib/soapLogic.ts`. O sistema utiliza programação orientada a objetos para garantir integridade nos cálculos:

  - **Classe Oleo:** Armazena os índices de saponificação (SAP) para NaOH e KOH e os atributos intrínsecos do óleo.
  - **Classe AtributosSabonete:** Define as 7 qualidades do sabão.
  - **Cálculo Ponderado:** O sistema calcula a média ponderada dos atributos baseada na porcentagem de cada óleo na receita total.
  - **Algoritmo de Cor (Cor\_Oleo\_Atributo):**
      - **Verde (10):** Valor Ideal.
      - **Amarelo (5-9 ou 11-15):** Aceitavel.
      - **Vermelho (\<5 ou \>15):** Fora do ideal/atenção necessária.


```
```


