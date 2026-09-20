# Remove the Contact page

Only the "Let's Connect" contact section on the homepage remains (WhatsApp button + form card). The old `/contact` page — with its outdated placeholder info (hello@atelier.studio, +1 555 number, New York) — will be fully removed.

## Changes

1. **`src/App.tsx`**
   - Delete the `/contact` route and the `Contact` import.

2. **`src/components/layout/Header.tsx`**
   - Remove the "Contact" entry from the menu links (menu shows Home, Portfolio, Journal).

3. **`src/pages/Contact.tsx`**
   - Delete the file.

4. **`src/components/ProcessSlider.tsx`** (dead code cleanup)
   - This "Our Process" component is no longer used anywhere and contains two links to `/contact`. Delete the file so no dead links to the removed page remain.

## Verification

- Typecheck (`tsgo --noEmit`) and build must pass.
- Confirm via Playwright: `/contact` now shows the Not Found page, the header menu has no Contact link, and the homepage contact section (WhatsApp + form) is untouched.
