# Open questions blocking launch

Raised from reading the product repositories. Each needs a decision from
Alphalogix, not a guess from a contributor.

## 1. Is Guardian a peer of Nexus, or a module of it? ⚠️ BLOCKING

Two repositories state this differently, in writing:

- `alphalogix-guardian/README.md`:
  > "**Guardian sees. Nexus orchestrates. Sage advises.**"
  > "This one is **Guardian**. Not 'Nexus Guardian': prefixing it implies
  > Guardian is a module of Nexus, which ADR-0001 and the architecture exist
  > to deny."

- `alphalogix-atlantis/README.md`:
  > "Guardian sees. **Core** orchestrates. Sage advises."
  > and a component table listing "**Nexus Guardian** — edge detection"

So: does Nexus orchestrate, or does *Nexus Core*? Is it "Guardian" or "Nexus
Guardian"? These cannot both be right, and the website is where the answer
becomes public and expensive to change.

This site currently follows ADR-0001 (Guardian as a peer) on the grounds that a
decision record outranks a prose line in another repo's README. **Confirm or
correct before launch.**

## 2. How many products are we actually announcing?

The repositories describe more than the two on this site:

| Name | Where | Role |
|---|---|---|
| Nexus (Core) | `alphalogix-nexus` | Portal, tenancy, twin |
| Guardian | `alphalogix-guardian` | Edge video intelligence, at the customer site |
| Sage | `alphalogix-atlantis` | Advises. Enterprise-tier capability inside Nexus |
| Atlantis Staff | `alphalogix-atlantis` | **Acts** — raises invoices, routes leads, drafts replies |
| Beacon | referenced in `alphalogix-atlantis` | Referred to as "Guardian's Beacon" — undefined here |

Sage is in `lib/content.ts` with `listed: false` so it does not publish
accidentally. Atlantis Staff and Beacon are not modelled at all.

**Decision needed:** which of these are public names, and which are internal
implementation detail? Announcing five names at once will confuse buyers;
announcing two and adding three later means renaming a live site.

Note that Atlantis Staff *writes to real systems* ("raises invoices"). That is
a materially different risk and sales conversation from Sage, which is
"authoritative for nothing." They should almost certainly not share a page.

## 3. Where does the MSP business sit relative to the platform?

The site currently presents three pillars — Guardian, Nexus, Managed Services —
per the brief. Strictly this mixes categories: Guardian and Nexus are products
within one platform family, while managed services is a services business.

The cleaner structure is two top-level things (Platform, Services) with the
platform having its own internal shape. Worth revisiting once question 2 is
settled, because the answer changes the nav.

## 4. Nexus app domain

`alphalogix-nexus/README.md` says the portal will be served at
`nexus.alphalogix.com.au`. This site's `/platform/nexus` is the *marketing*
page. Confirm that split is intended (it is the right one) and that the sign-in
entry point should link across to the subdomain.

## 5. Where does the Figma file live?

The prototype from the previous designer is a `/proto/` link, which means the
file sits in **their** Figma account, not an Alphalogix one. Get ownership
transferred before that relationship goes cold. Export frames to PNG and commit
them to this repo if they should inform the design.
