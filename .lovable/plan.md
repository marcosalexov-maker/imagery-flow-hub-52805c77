# Replace header menu with direct navigation buttons

## Goal
Remove the "Menu" button and fullscreen overlay from the header. Replace it with four always-visible, right-aligned links that take the visitor straight to the page or section they reference, styled like the grey uppercase labels used above section titles on the homepage.

## Navigation behavior
- **Portfolio** → `/portfolio` page.
- **About** → homepage "About" section (smooth scroll; from other pages, go home first, then scroll).
- **Journal** → `/blog` page.
- **Contact** → homepage "Let's Connect" section (same smooth-scroll behavior as About).
- Order left to right: Portfolio, About, Journal, Contact. All right-aligned, opposite the "Marcos Alex" brand on the left.
- The link for the page you're currently on is highlighted white; the others are grey.

## Style
Match the grey label texts above section titles (e.g. "SELECTED WORK", "ABOUT"):
- Small uppercase text with letter spacing: `text-xs md:text-sm font-medium tracking-[0.2em] uppercase`
- Grey (`text-white/60`) that turns white on hover, with a smooth color transition.
- Compact gap between items so all four fit in the header on desktop.

## Mobile behavior
- On mobile the header keeps a "Menu" button (right-aligned, same grey label style) that opens a fullscreen overlay stacking all four links vertically, centered, in large text — reusing the existing overlay menu design.
- The overlay lists the same four items; tapping one navigates/scrolls and closes the menu.

## Files changed
- `src/components/layout/Header.tsx` — desktop: remove the menu button and render the four right-aligned links; mobile: keep a menu button that opens the fullscreen overlay stacking all four links (overlay and its state stay, now shared with the mobile links).
- `src/pages/Index.tsx` — add `id="about"` and `id="contact"` to the About and CTA sections so the header can scroll to them.

## Verification
- Check the header on desktop (direct links) and mobile (menu button → stacked overlay): correct order, style and behavior.
- Confirm Portfolio and Journal navigate to their pages; About and Contact scroll to the right homepage sections (including from the Portfolio and Journal pages).
- Confirm no build/type errors.
