# STOCK.IO · Front-end

Interface web do **STOCK.IO**, plataforma do Grupo 9 onde os usuários descobrem **lojas** e **produtos**, filtram por categoria, gerenciam suas próprias lojas e publicam **avaliações**. Feita com Next.js, React e Tailwind CSS.

> A API que alimenta esta interface está em [grupo-9-back-end](https://github.com/equipe-9-full-stack/grupo-9-back-end).

## Tecnologias

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)

- **Framework:** Next.js (App Router) com TypeScript
- **Estilo:** Tailwind CSS 4
- **Ícones:** `lucide-react` e `react-icons`
- **Requisições:** `fetch` e `axios`

## Funcionalidades

- Cadastro e login de usuários
- Página inicial com carrossel e listas de **melhores avaliados**, **mais baratos** e **recém-adicionados**
- Navegação por categorias (Mercado, Farmácia, Beleza, Moda, Eletrônicos, Jogos, Brinquedos e Casa)
- Barra de pesquisa e filtros
- Página de cada loja, com galeria de produtos e avaliações
- Perfil do usuário: editar dados, alterar senha e gerenciar lojas e produtos
- Avaliação de lojas e produtos, com nota, comentário e edição

## Páginas

| Rota | Descrição |
| --- | --- |
| `/login` e `/cadastro` | Autenticação e criação de conta |
| `/home` | Página inicial com destaques e categorias |
| `/lojas/[id]` | Página de uma loja |
| `/lojas/[id]/avaliacoes` | Avaliações de uma loja |
| `/avaliacoes/[id]` | Detalhes de uma avaliação |
| `/produto` | Página de produto |
| `/tela_itens_especificos` | Itens de uma categoria específica |
| `/perfil` | Perfil do usuário, com suas lojas e produtos |
| `/profile` | Configurações da conta (editar perfil e alterar senha) |

## Como executar

### Pré-requisitos

- Node.js 20.9 ou superior
- A [API do back-end](https://github.com/equipe-9-full-stack/grupo-9-back-end) em execução

### Passo a passo

```bash
# 1. Clone o repositório e entre na branch de desenvolvimento
git clone https://github.com/equipe-9-full-stack/grupo-9-front-end.git
cd grupo-9-front-end
git checkout dev

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:3000**.

### Conexão com a API

O endereço da API está escrito diretamente no código como `http://localhost:3000` (em `src/app/services/api.ts` e nas páginas que usam `fetch`). O back-end sobe por padrão na porta **3001**, e o Next.js usa a 3000. Para rodar os dois juntos, escolha uma das opções:

- Inicie o front em outra porta: `npm run dev -- -p 3002`, e mantenha a API na 3001, ajustando o endereço da API no front para `http://localhost:3001`.
- Ou altere a porta do back-end em `src/main.ts` e mantenha o front na 3000.

## Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Gera a build de produção |
| `npm start` | Executa a build de produção |
| `npm run lint` | Roda o ESLint |

## Estrutura

```
src/
├── app/
│   ├── home/  login/  cadastro/  perfil/  produto/
│   ├── lojas/[id]/            # loja e suas avaliações
│   ├── avaliacoes/[id]/
│   ├── services/api.ts        # instância do axios
│   ├── layout.tsx
│   └── globals.css
└── components/                # Navbar, Carrossel, CardProduto e modais
hooks/                         # useAuth, useSearch
public/                        # imagens e mascote
```

## Fluxo de trabalho

1. Crie uma branch a partir da `dev` (`feat/nome-da-feature`).
2. Abra um Pull Request para a `dev`.
3. Depois da revisão, a `dev` é integrada à `main`.

## Equipe

Projeto desenvolvido pelo **Grupo 9** (organização [equipe-9-full-stack](https://github.com/equipe-9-full-stack)):

- [@lianeiv](https://github.com/lianeiv)
- [@Lulu-souza](https://github.com/Lulu-souza)
- [@mahluoliveira](https://github.com/mahluoliveira)
- [@LeticiaSantosss](https://github.com/LeticiaSantosss)
