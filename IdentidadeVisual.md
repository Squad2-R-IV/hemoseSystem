# Identidade Visual

Este documento descreve o padrão de componentes e a estilização do HemoseSystem.

## Cores
- **Primária (`#B91C1C`)**: utilizada em botões, cabeçalhos e elementos de destaque.
- **Secundária (`#111827`)**: cor principal de textos.
- **Realce (`#2563EB`)**: usada para links e ações secundárias.
- **Fundo (`#F8FAFC`)**: cor de fundo padrão das páginas.

## Tipografia
- **Poppins** para títulos e elementos de destaque.
- **Inter** para textos e conteúdo geral.

## Componentes
- Botões e campos possuem bordas arredondadas (`rounded-md`).
- Navegação (navbar e sidebar) utiliza a cor primária com textos em branco.
- As páginas utilizam a cor de fundo `background` definida no `tailwind.config.js`.

## Estilos Globais
- TailwindCSS define as utilidades e as classes personalizadas.
- As fontes são importadas em `root.tsx`.
- O arquivo `input.css` aplica as fontes e cores base ao `body` e aos cabeçalhos.

Todos os componentes devem seguir essas diretrizes para garantir consistência visual.
