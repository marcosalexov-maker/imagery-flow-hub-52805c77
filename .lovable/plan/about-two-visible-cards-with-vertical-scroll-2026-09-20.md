# About: two visible cards with vertical scroll

## Goal
In the About section, show only two of the four cards (Storytelling, Impact, Filmmaking, Photography) at a time, with a vertical scroll to reach the rest, and keep the cards area visually centered against the photo carousel.

## Layout (desktop)
- Make both grid columns the same height as the photo carousel (the row height is driven by the carousel's 4:5 frame).
- Put the four cards inside a fixed-height, vertically scrollable area (`overflow-y-auto`) exactly as tall as the carousel, so only about two cards are visible at once.
- Hide the scrollbar for a clean look; scrolling works with mouse wheel, trackpad and touch.
- Keep the visible cards vertically centered relative to the carousel (grid `items-center` + centered content inside the scroll area when it fits).

## Mobile
- Unchanged: carousel on top, all four cards stacked below (the page itself scrolls, so no inner scroll needed there).

## Details
- Add a `no-scrollbar` utility (hidden scrollbar, keep scrolling) to `src/index.css`.
- Wrap the cards list in `src/pages/Index.tsx` with the scroll container; no changes to the card designs, texts or the `AboutCarousel` component.
- Keep the existing stagger/reveal animations working inside the scroll area.

## Verification
- Typecheck passes; check `/tmp/observability/build-errors.log`.
- Confirm on desktop preview: two cards visible, scroll reveals the other two, no visible scrollbar, cards area aligned with the carousel height.
- Confirm mobile keeps the stacked layout with no inner scrolling.
