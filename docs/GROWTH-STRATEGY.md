# Growth strategy: what the data actually says

Audited 16 September 2026 against the live site, the `Alphalogix Ad` Meta ad
account (`1616456893479210`) and its pixel (`28025025213825496`).

---

## The finding that outranks everything else

**The site received roughly 77 pageviews in the last seven days.** About eleven
visits a day.

That is the problem. Not the design, not the tooling, not the ad creative. A
redesign changes the *conversion rate* of traffic that arrives; it cannot
change the fact that almost nobody arrives. Rebuilding the site and expecting
leads to follow is spending on the denominator and hoping the numerator moves.

Both things need doing. Only one of them is urgent, and it is not the one that
feels like progress.

---

## Measurement: built, then not validated

The pixel exists, is active and fired as recently as yesterday. It is injected
through Google Tag Manager (`GTM-5VXZTRDD`), which is why it does not appear in
the page source. Good — the infrastructure is there.

Then it goes wrong.

### Three events for one action

In a single hour on 13 September the pixel recorded:

| Event | Count |
|---|---|
| PageView | 7 |
| **Contact** | 6 |
| **SubmitApplication** | 4 |
| **Lead** | 1 |

Six `Contact` events from seven pageviews is not user behaviour. That is form
testing, or GTM firing duplicates, or both. Either way **the conversion data is
not trustworthy and has never been validated.**

Worse, three different events appear to represent the same action — someone
asking for a consultation. `SubmitApplication` is Meta's *job application*
event; it is semantically wrong here and suggests the GTM container was set up
from a template rather than from your actual funnel.

There is also one `__missing_event`: a tag firing with no event name at all.

**Consequence:** Meta's optimiser cannot learn from three competing signals,
and you cannot report on cost per lead because you do not have one definition
of a lead.

### No server-side signal

`server_last_fired_time` on the dataset is epoch zero — the Conversions API has
never sent an event. Browser-only tracking loses a material share of
conversions to iOS restrictions, ad blockers and cookie policy. For low-volume
B2B, where every conversion matters to the optimiser, that loss is expensive.

---

## The live campaign is optimising for the wrong thing

Campaign `26 | EC`, currently **ACTIVE**:

| | |
|---|---|
| Objective | `OUTCOME_ENGAGEMENT` |
| Spend | AU$179.60 |
| Impressions | 9,037 |
| Reach | 5,329 |
| Result | 15 "messaging conversations started" |
| Cost per result | AU$11.97 |

Two problems.

**1. Engagement is not a revenue metric.** Meta counts a "messaging
conversation started" when someone taps the button and sends anything at all.
Fifteen of those is not a pipeline. For a business selling recurring per-endpoint
contracts, the only metrics that matter are qualified consultation requests and
contracts signed.

**2. You built a pixel and then ran a campaign that ignores it.** The
engagement objective does not optimise against pixel conversions. The
measurement infrastructure and the campaign are not connected. That is the
single highest-leverage fix available, and it costs nothing.

At AU$179.60 across 9,037 impressions this is a test, not a campaign, so do not
over-read the numbers. The CPM of roughly AU$20 is on the high side, which
usually means narrow targeting or creative that is not earning attention — but
at this volume that reading is indicative, not conclusive.

---

## Meta is the wrong *primary* channel for RMM revenue

This is the part worth arguing about, so here is the argument.

RMM revenue is per-endpoint recurring managed services, sold to business owners
and IT decision-makers, at contract values in the thousands per month, with a
long consideration cycle and a high switching cost. That demand does not
originate in a social feed. It surfaces when something breaks, a contract comes
up for renewal, or a business outgrows its current provider — and when it
surfaces, people search.

| Channel | Fit | Why |
|---|---|---|
| **Google Search** | **Primary** | Captures existing intent — "managed IT support sydney", "IT provider for construction company". The buyer is already looking. |
| **Google Business Profile / local SEO** | **Primary** | Free, and MSP buying is geographically constrained. Suite 104, 235 Clarence Street is an asset. |
| **LinkedIn** | Secondary | The only platform that targets your actual ICP directly — company size, industry, job title. Expensive per click, but the targeting matches how you qualify. |
| **Referral / vendor partnerships** | Underrated | You are a certified partner of Milestone, Genetec, Avigilon, Verkada and Nx Witness. Those vendors have partner-referral motions. This is the cheapest pipeline available to you and it requires no ad spend. |
| **Meta** | **Retargeting only, for now** | Needs an audience pool to retarget. Eleven visits a day does not build one. |

Meta can work for MSPs — geo-targeted, strong offer, local credibility. But it
is not where the first dollar goes when search intent is unharvested and the
retargeting pool is empty.

---

## Do not advertise Guardian or Nexus

Their own repositories are explicit. Guardian: *"Nothing here runs yet. Gate 0
is failed."* Nexus: device-status integration still marked `TODO-VERIFY`.

Advertising them would generate demand you cannot fulfil, against claims
`MARKETING_GUARDRAILS.md` forbids, to buyers who will ask for a demo you do not
have. The product pages exist so that people who find you organically
understand where you are heading. That is a positioning asset. It is not an ad
campaign.

Spend against managed services — the thing you can sell today.

---

## Sequence

### Now, before any new spend
1. **Collapse the conversion events to one.** One `Lead` event, fired once, on
   genuine consultation-form submission. Remove `SubmitApplication` entirely —
   wrong semantics. Keep `Contact` only if it marks a genuinely different action.
2. **Validate it.** Use Meta's Test Events tool, submit the form once, confirm
   exactly one event arrives. The 13 September data proves this was never done.
3. **Fix the `__missing_event` tag** in GTM.
4. **Switch `26 | EC` off, or change its objective** to `OUTCOME_LEADS`
   optimising on the validated `Lead` event.

### Weeks 1–4: harvest existing intent
5. **Google Search campaign** on high-intent managed-IT and cyber-security
   terms, geo-fenced to your service areas. This is where the buyers are.
6. **Google Business Profile**, fully completed, with review generation from
   existing happy customers.
7. **Fix the on-site SEO defects** in `SEO-CONTINUITY.md` — duplicate `<h1>`,
   title/H1 mismatch.

### Weeks 4–12: build the base
8. **Conversions API** via server-side GTM, so the signal survives browser
   restrictions.
9. **Vendor partner referrals** — approach your five surveillance vendors about
   their partner programmes. Zero media cost.
10. **Then** Meta retargeting, once there is traffic worth retargeting, plus
    lookalikes built from real closed-won customers rather than Messenger taps.

---

## What I have not verified

- Google Ads and Google Analytics were not audited; GTM is present but I did
  not inspect the container's contents or any GA4 property.
- I only examined the `Alphalogix Ad` account. Two other accounts are
  accessible from the same login — a personal one with no payment method, and
  `Virvio` under a separate business with a payment method attached. If Virvio
  is unrelated to Alphalogix, it should not share an admin surface with it.
- No Guardian or Nexus market demand research. Neither name has any public
  search footprint, which is expected pre-launch but means demand for them is
  unproven.
