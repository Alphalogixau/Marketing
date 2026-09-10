# Lead Pipeline

Designed against real account data, not theory. The September 2026 numbers:

```
$140.53 spent → 5,367 impressions → 126 clicks → 15 conversations → 3 enquiries → 0 qualified
```

Every stage converted except the last one. **The pipeline's job is to move the
qualification gate earlier**, so unqualified people are filtered by the system rather
than by Peter's time.

---

## The core principle

**Qualify before you spend human attention.**

Right now every conversation reaches a person. Fifteen conversations consumed real
time and produced nothing. At scale that doesn't break the ad budget — it breaks the
business, because the founder becomes the filter.

The fix is three questions asked automatically, before anyone replies.

---

## Stages

| # | Stage | Entry condition | Owner | SLA | Metric |
|---|---|---|---|---|---|
| 0 | **Impression** | Ad served to targeted audience | Meta | — | CPM |
| 1 | **Click** | Clicked the ad | Meta | — | CTR, CPC |
| 2 | **Conversation** | Sent a message / submitted form | Meta | — | Cost per conversation |
| 3 | **Auto-qualification** | 3 questions answered | **Automation** | Instant | % passing |
| 4 | **Qualified enquiry** | Meets all 3 criteria | Automation | Instant | **Cost per qualified enquiry** ← the number that matters |
| 5 | **Contacted** | Human replies | Peter / team | **< 5 min business hours** | Speed to lead |
| 6 | **Review booked** | 15-min review in calendar | Peter | < 24h | Book rate |
| 7 | **Review held** | Call actually happened | Peter | — | Show rate |
| 8 | **Scoped** | Proposal issued | Peter | < 5 days | Proposal rate |
| 9 | **Won** | Signed | Peter | — | Close rate, CAC |

**Stage 3 is the entire point of this document.** It does not exist today.

---

## The qualification gate

Three questions, asked automatically the moment someone messages. No human involved.

**Q1 — "Whereabouts is your business based?"**
✅ Sydney metro, greater NSW, or a serviceable capital
❌ Anywhere you can't reach for a site visit

**Q2 — "Roughly how many staff?"**
✅ 15–150
⚠️ 5–15 → nurture, don't book a call
❌ Under 5, or a home user

**Q3 — "What's prompting you to look right now?"**
✅ Unhappy with current provider · growing · compliance/insurance requirement ·
   recent incident · opening a site
❌ Price shopping only · no trigger · selling something to you

**Pass all three → Stage 4.** Anything else → auto-reply with the blog and the free
calculator, and no human time is spent.

### Hard disqualifiers — route straight out

- Agencies, freelancers or resellers pitching services *(the most common junk in
  messaging ads)*
- Consumers wanting home IT or a home camera
- Students, job seekers, course enquiries
- Outside serviceable geography

---

## Realistic conversion targets

Once targeting is fixed, from 100 conversations:

| Stage | Rate | Count |
|---|---|---|
| Conversations | — | 100 |
| Pass auto-qualification | 30–40% | 35 |
| Contacted within SLA | 95% | 33 |
| Review booked | 40% | 13 |
| Review held | 75% | 10 |
| Scoped | 50% | 5 |
| **Won** | **30%** | **1–2** |

At $9.37 per conversation that's roughly **$470–940 per client** — against ~$84,000
gross profit over a client's life. That is the whole argument for spending more, and
it only works once Stage 3 exists.

**Today's actual rate through Stage 4 is 0%.** Every number above is currently theoretical.

---

## What to measure

Stop tracking engagement. Three numbers:

1. **Cost per qualified enquiry** (Stage 4) — the real cost metric
2. **Speed to lead** (Stage 4→5) — the highest-leverage controllable
3. **Qualification rate** (Stage 3) — if under 20%, targeting is still wrong;
   if over 60%, the gate is too loose

A campaign with a great cost-per-conversation and a bad cost-per-qualified-enquiry is
a losing campaign. That is exactly the current situation, and only the second number
reveals it.

---

## Automation requirements

Whatever runs this — Atlantis, a CRM, or Meta's own tools — needs:

1. **Trigger** on new conversation or form submission
2. **Ask** the three questions in sequence, capture structured answers
3. **Score** pass / nurture / reject against the criteria above
4. **Route** — pass to a human queue with a 5-minute alert; nurture to a sequence;
   reject to a polite close
5. **Record** stage, timestamps and source campaign per lead
6. **Report** the three metrics above

Everything except (1) is business logic, not platform-specific — it ports to any tool.

## Open

**What does Atlantis do?** It's internal, so it isn't visible from here. Tell me
whether it's a CRM, a workflow engine, a ticketing system or something else, and I'll
map these stages onto its actual objects and fields rather than leaving it generic.
