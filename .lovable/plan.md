# CTA Section "Let's Connect" below the About section

## Objetivo
Adicionar uma seção de chamada para ação (CTA) ao final da página inicial, logo abaixo da seção About, seguindo o design system existente (fundo preto, texto branco, títulos e rótulos no mesmo estilo das outras seções).

## Estrutura da seção
- Posição: nova `<section>` em `src/pages/Index.tsx`, após a seção About e antes do fechamento do `</Layout>`.
- Fundo preto (`bg-black text-white`), com padding vertical consistente com as demais seções (`pt-8 md:pt-10 pb-12 md:pb-16` na linha do About).
- Conteúdo centralizado dentro de `container`:
  1. Rótulo uppercase no padrão existente: `text-sm font-medium tracking-[0.3em] uppercase text-white/60` com o texto "GET IN TOUCH".
  2. Título "Let's Connect" no mesmo estilo dos títulos de seção (`text-4xl md:text-5xl tracking-tight font-normal`).
  3. Dois botões lado a lado (empilhados no mobile), ambos com o espaçamento padrão de botões `px-8 py-3.5` e `rounded-full`:
     - **Botão 1 — WhatsApp**: texto "Whatsapp (+55 41 98421-6095)", estilo primário (fundo branco, texto preto, hover `bg-white/90`), abre `https://wa.me/5541984216095` em nova aba (`target="_blank" rel="noopener noreferrer"`).
     - **Botão 2 — Email**: texto "Email (marcosalexo@gmail.com)", estilo secundário (borda `border-white/20`, texto branco, hover `bg-white/10`), abre o app de e-mail padrão via `mailto:marcosalexo@gmail.com`.

## Animação
- Envolver o conteúdo em `FadeUp` (mesmo reveal sutil de scroll já usado em Portfolio e About), respeitando `prefers-reduced-motion` como o restante do site.

## Verificação
- Confirmar via Playwright (desktop e mobile) que a seção aparece abaixo do About, com os dois botões clicáveis e os links corretos.
- Rodar o typecheck e conferir `/tmp/observability/build-errors.log`.

## Arquivos envolvidos
- `src/pages/Index.tsx`
