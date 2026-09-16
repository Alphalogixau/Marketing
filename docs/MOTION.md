# Motion direction

## Principle

**Motion expresses system behaviour, or it does not ship.**

Animation is not decoration here. Every moving thing on this site should be
answerable to the question "what true fact about the product does this show?"
If the answer is "it looks modern", delete it. Indiscriminate animation is the
single fastest way to make an engineering-led company look like a template.

## What earns motion

| Element | Motion | The fact it expresses |
|---|---|---|
| Incident pipeline | Pulse walks 9 stages; holds ~2x longer on stages 1, 4, 9 | Those three stages *are* the argument — the quality gate, "a detection is not an incident", and shadow mode. The dwell is the message. |
| Topology visual | Pulses travel site → core, never the reverse | The edge is authoritative. The portal reads. Reversing the arrows would misrepresent the architecture. |
| Site nodes | Three lanes pulse independently per node | Each site processes locally and independently. A node does not wait on the core. |
| Section reveals | One shared curve, 0.7s, `cubic-bezier(0.16, 1, 0.3, 1)` | Nothing. This is pacing, which is why it is uniform and subtle. |
| Nav flyouts | 0.18s scale+fade | Nothing. Interface feedback should be fast enough to feel instant. |

## What does not get motion

- Body copy, headings beyond the shared reveal, service cards, footers.
- Anything that would animate on every scroll rather than once.
- Counters ticking up to a number. We have no verified numbers to tick to
  (see `MARKETING_GUARDRAILS.md`), so a counter would be fabricating one.
- Parallax. It fights the reader and costs frames.

## Rules

1. **One easing system.** `--ease-out-expo` for entrances, `--ease-in-out-soft`
   for state changes. Defined in `app/globals.css`. Components do not invent
   their own curves.
2. **All reveals route through `components/reveal.tsx`.** If a section needs a
   different feel, that is a signal to reconsider the section, not to add a
   second animation system.
3. **`prefers-reduced-motion` is honoured everywhere, and degrades to the final
   state.** Never to a hidden state. The pipeline component sets itself to the
   last stage rather than freezing at stage one.
4. **Nothing animates above the fold on first paint except the hero reveal.**
   Layout must be stable immediately; motion arrives after.
5. **No animation library beyond `motion`.** One dependency, already in use.

## Performance budget

The current WordPress homepage ships ~440KB of HTML and 55 CSS/JS assets. That
is the bar we are beating, not matching.

- First-load JS for any route: **under 200KB**.
- No animation runs off the main thread budget: transform and opacity only.
  Never animate `width`, `height`, `top` or `left`.
- SVG visuals are inline and hand-authored. No Lottie, no video backgrounds,
  no animated GIF.

Check with `npm run build` — the route table prints first-load JS per page.
