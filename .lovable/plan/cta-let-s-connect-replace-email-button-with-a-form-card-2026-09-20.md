# CTA "Let's Connect" — replace Email button with a form card

## Objetivo
Na seção CTA do final da página inicial, substituir o botão "Email (marcosalexo@gmail.com)" por um formulário de contato em estilo de card, posicionado logo abaixo do botão do WhatsApp.

## Layout da seção CTA (`src/pages/Index.tsx`)
- Título "Let's Connect" e botão do WhatsApp permanecem como estão (botão branco centralizado).
- Abaixo do botão do WhatsApp, um card no estilo existente do site (`bg-white/5`, `rounded-4xl`, largura máxima ~`max-w-2xl` centralizado) contendo o formulário:
  1. **Name** — campo de texto, placeholder "Who you are".
  2. **Email** — campo de texto (type email), placeholder "Your best email".
  3. **Project Type** — campo de texto, placeholder "Event, Video, Photography, Content creation".
  4. **Message** — textarea, placeholder "Tell me more about your project".
  5. Botão de envio no padrão do site (`rounded-full`, `px-8 py-3.5`), fundo branco / texto preto, com ícone de envio.

## Comportamento do envio
- Mesmo padrão da página de contato atual (`src/pages/Contact.tsx`): ao enviar, monta um `mailto:` para `marcosalexo@gmail.com` com assunto e corpo pré-preenchidos (Name, Email, Project Type e Message) e abre o app de e-mail padrão do visitante.
- Validação simples (mesma do Contact): nome, e-mail válido e mensagem obrigatórios; limites de tamanho nos campos.
- Feedback ao usuário: toast "Message ready!" + mensagem de sucesso dentro do card (com botão "Send Another Message").
- Campo honeypot oculto contra bots, como no Contact.

## Estilo
- Fundo preto da seção, textos brancos, inputs com fundo translúcido (`bg-white/10` ou similar) e bordas `border-white/20`, placeholders em `text-white/50`.
- Envolvido em `FadeUp`, como o restante da seção.

## Verificação
- Playwright (desktop e mobile): card visível abaixo do botão do WhatsApp, campos com os placeholders corretos, validação bloqueando envio vazio, mailto montado corretamente.
- Typecheck (`tsgo`) e conferência de `/tmp/observability/build-errors.log`.

## Arquivos envolvidos
- `src/pages/Index.tsx` (única alteração; reaproveita `Input`/`Textarea` de `src/components/ui`)
