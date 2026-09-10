# The $10/Day Test — Exact Setup

## First, what this test can and cannot tell you

At $10/day in Australian B2B you'll buy roughly **250–400 impressions a day**.
Over 14 days that's ~5,000 impressions, maybe 40–60 link clicks, and **2–8 leads**.

**That sample is far too small to tell you whether the ad "works" for leads.** Two
leads versus five is noise, not signal. Anyone who tells you otherwise is guessing.

What $10/day *can* tell you, reliably:

| Question | Answerable at $10/day? |
|---|---|
| Does the creative hold attention? | ✅ Yes — view rates stabilise fast |
| Does the offer earn a click? | ✅ Yes — CTR needs only ~1,000 impressions |
| Does the whole funnel work end to end? | ✅ Yes |
| Is the cost per lead sustainable? | ❌ No — sample far too small |
| Which of three variants wins? | ❌ No — see below |

**So judge this test on creative metrics, not lead count.** That's the honest frame,
and it's also the useful one: if the hook fails, no budget fixes it.

---

## ⚠️ Do not run all three variants

This is the most important decision in the whole setup.

Meta needs roughly **50 optimisation events per ad set per week** to exit the learning
phase and deliver efficiently. Three variants at $10/day means **$3.33/day each** —
none of them ever exits learning, all three deliver badly, and you learn nothing about
any of them.

**Run one ad. Test sequentially.** Variant A for 14 days, then Variant B for 14 days.
Slower, but it produces an actual answer instead of three unreadable ones.

---

## The exact build

### Campaign
| Setting | Value |
|---|---|
| Name | `ALX \| INTRO \| LEADS \| SEP26` |
| Objective | **Leads** (`OUTCOME_LEADS`) |
| Budget | **Campaign budget (CBO), $10.00/day** |
| Bid strategy | Highest volume (lowest cost, no cap) |
| Special ad categories | None |

### Ad set
| Setting | Value |
|---|---|
| Name | `SYD50 \| BROAD \| 30-60` |
| Conversion location | **Instant forms** |
| Performance goal | **Maximise number of leads** |
| Page | Alphalogix (`103209089333340`) |
| Location | **Sydney + 50km**, set to **"People living in this location"** |
| Age | 30–60 |
| Detailed targeting | **None. Leave it broad.** |
| Advantage+ audience | **On** |
| Placements | **Advantage+ (automatic)** |
| Schedule | Run continuously |

**Why Instant Forms, not your website:** you have no pixel history. A website
conversion campaign at $10/day will never gather the ~50 weekly events Meta needs, so
it will deliver badly and cost more per lead. On-platform forms need no pixel and
typically convert 3–5× better on cold traffic. Use the website once there's data.

**Why broad, not interest targeting:** at $10/day you need the largest possible pool
for Meta to find your cheapest converters. Stacking interests fragments a budget
that's already tiny. Broad genuinely outperforms hand-picked interests at low spend.

**Why automatic placements:** restricting placements at this budget removes the
cheapest inventory Meta has. Let it find the bargains.

### Ad
| Setting | Value |
|---|---|
| Name | `INTRO \| 9x16 \| variantA` |
| Format | Single video |
| Creative | The campaign 1 video (1080×1920) |
| Primary text | **Variant A** — see `01-meta-launch-captions.md` |
| Headline | `Free 15-Minute IT Review` |
| Description | `Sydney based, Australia wide` |
| CTA button | **Book Now** |
| Destination | Instant form — *Free Security Review* |
| Identity | Alphalogix Page + `@alphalogixaus` Instagram |

---

## Pre-flight — all must be true before you spend a cent

- [ ] Alphalogix **ad account exists**, AUD, Australia/Sydney, payment method attached
- [ ] **Lead Gen ToS accepted** at facebook.com/legal/leadgen/tos — forms won't run without it
- [ ] **Instant form built and submitted by you personally** to confirm it works
- [ ] **Lead notifications** land somewhere a human sees within minutes
- [ ] **Meta Pixel installed** on alphalogix.com.au and msp.alphalogix.com.au — not
      needed for this campaign, but every day without it is retargeting audience you
      can never recover
- [ ] **Someone owns the callback**, under 5 minutes in business hours

That last one decides the outcome more than any setting above.

---

## The one thing to do beyond the ad set

Turn on a **$0 audience build**: once this runs, everyone who watches the video
becomes retargetable. Create these Custom Audiences now so they start filling
immediately:

- Video viewers — 50%+ watched, 365 days
- Instagram engagers, 365 days
- Facebook Page engagers, 365 days
- Website visitors, 180 days *(needs the pixel)*

They cost nothing and they're the cheapest conversions you'll ever buy later.
**This is the real return on a $10/day test.**

---

## What to look at, and when

**Don't touch anything for 7 days.** Editing resets the learning phase. This is the
most common way small budgets are wasted.

### Day 7 — creative check only

| Metric | Good | Concerning |
|---|---|---|
| 3-second video plays / impressions | >20% | <15% |
| ThruPlay rate | >8% | <5% |
| Link CTR | >0.8% | <0.5% |
| Cost per lead | any | — *(sample too small to judge)*

### Day 14 — decide

| What you see | What it means | What to do |
|---|---|---|
| 3-sec view <15% | The hook isn't landing | Fix the creative — eyeline and framing first |
| 3-sec good, CTR <0.5% | Video holds, offer doesn't | Swap to Variant B or C |
| CTR good, no leads | Form or friction problem | Shorten the form |
| Leads under $60 | It's working | Scale to $30/day, +20% every 3–4 days |
| 0 leads, all metrics weak | Message-market mismatch | Try the surveillance angle instead |

---

## Honest expectation

Two weeks, $140 spent, and the likely outcome is **2–8 leads and a clear read on
whether the creative holds attention.** If one of those leads becomes a client, the
test paid for the next two years of the entire programme.

Don't judge this on lead count. Judge it on whether the hook worked — because that's
the thing you can actually fix, and the thing everything else depends on.

## When to stop testing and commit

Once the 3-second view rate clears 20% and CTR clears 0.8%, the creative is proven.
At that point the constraint is budget, not message — move to
`../strategy/06-the-3k-plan.md` and put the money into Google Search where the
demand already exists.
