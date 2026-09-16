# Marketing guardrails

These are not style preferences. Each one comes from an architecture decision
record in `alphalogixaus/alphalogix-guardian` with a test or review gate behind
it. Marketing copy that breaks one of these contradicts the product.

## Never publish

| Claim | Why not |
|---|---|
| Camera capacity per node ("supports 200 cameras") | ADR-0008: no capacity is quoted without a measured profile from `tests/performance/`. None exists yet. |
| Latency or alert-time figures ("alerts in under 3 seconds") | No latency SLO exists until the benchmark does. The 28 August three-second target was measured from source frame while requiring 2.2s of persistence — unmeetable as written. |
| Accuracy or false-positive percentages | No validated figure exists. |
| Customer counts, logos or testimonials for Guardian or Nexus | Neither product has production users. |
| Anything implying the products are purchasable today | Guardian: "nothing here runs yet." Nexus: device-status integration still marked `TODO-VERIFY`. |

## Never depict

**No facial recognition imagery. At all.**

Guardian ships no facial recognition, licence plate recognition, watchlists or
appearance search, and the architecture requires recognition to be *completely
absent from the UI, not merely disabled*. That constraint extends to the
marketing site.

Specifically, do not use:

- Bounding boxes drawn around faces
- Identity-match visuals, "person identified" panels, watchlist mockups
- Face-grid or gallery imagery
- Stock imagery of surveillance-as-identification

This is the default visual cliché of the video-AI category, which is exactly
why avoiding it is a positioning asset rather than a limitation. The site uses
abstract topology and pipeline diagrams instead — see
`components/topology-visual.tsx`, which carries this note inline.

## Naming

Follow `alphalogix-guardian` ADR-0001: **Guardian is a peer of Nexus, not
"Nexus Guardian."** Prefixing implies Guardian is a module of Nexus, which the
architecture exists to deny.

⚠️ `alphalogix-atlantis/README.md` currently contradicts this — it lists
"Nexus Guardian — edge detection" and says "Core orchestrates" where Guardian's
README says "Nexus orchestrates." **Unresolved.** See `OPEN-QUESTIONS.md`.

## Do say

The honest version is stronger than the inflated one, and it is available:

- "Video is processed on a node at your site and leaves only under a policy you set."
- "Frames we cannot trust are rejected before inference runs."
- "A detection is a candidate until rules qualify it. Model output is not an incident."
- "No detection reaches an operator without a shadow period first."
- "We will not quote a camera count before we have measured one on your profile."

That last one is a sales asset. Competitors quote numbers they cannot support.
