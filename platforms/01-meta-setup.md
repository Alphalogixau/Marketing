# Meta Ads Setup — Step by Step

## Situation — corrected August 2026

**Good news: more exists than first assessed.** The Alphalogix Business portfolio is
real and has been since January 2023, and it already owns the Facebook Page.

| Asset | Status | ID |
|---|---|---|
| Business portfolio | ✅ Exists (created 6 Jan 2023) | `1601856800244057` |
| Facebook Page | ✅ Owned by the portfolio | `103209089333340` |
| Instagram | ✅ Connected | `@alphalogixaus` |
| **Ad account** | ❌ **Does not exist** | — |

The available ad accounts are still only:

| ID | Name | Business | Payment |
|---|---|---|---|
| `23165511` | Peter Bublé | — (personal) | **None** |
| `411185735338258` | Virvio | virvioaus | Yes |

Neither belongs to Alphalogix. **The ad account is the one thing genuinely missing**,
and everything else waits on it.

---

## ⚠️ Read this before creating anything

**Your ad account creation limit is 1.**

You get exactly one. Two settings are **permanent and cannot be changed** after
creation — get them wrong and the single allowance is spent:

- **Currency: AUD**
- **Timezone: Australia/Sydney**

Getting either wrong means reporting, billing and scheduling are misaligned forever,
with no way back short of requesting a limit increase from Meta.

---

## Steps

### 1. Complete the business details first

Currently every field is empty and the business shows as **Unverified**. Fill these
in *before* creating the ad account — unverified businesses with blank profiles draw
more review scrutiny and hit lower spending limits.

Business settings → Business info → Edit:

- **Legal business name** — exactly as registered with ASIC
- **Address** — the registered business address
- **Phone**
- **Website** — `https://alphalogix.com.au`
- **Primary Page** — currently `None`; set it to **Alphalogix**

Then **Business verification** → View details → verify with the ABN and supporting
documents. Takes a few days; start it early because it gates higher spend limits.

### 2. Turn on two-factor authentication

Currently set to **No one**. Once an ad account with a live payment method sits under
this portfolio, that's a real financial exposure — compromised ad accounts get drained
fast and Meta support is slow. Set it to **Everyone** (Business options → Two-factor
authentication).

Do this before the card goes on.

### 3. Create the ad account

Business Settings → Accounts → Ad Accounts → Add → **Create a new ad account**.

- Name: `Alphalogix — Primary`
- **Currency: AUD** ← permanent
- **Timezone: Australia/Sydney** ← permanent
- Purpose: my own business

Then attach a payment method. New accounts begin with a low daily spend limit that
rises as billing history builds — that's normal, not a fault.

### 4. Grant the ad account to the ads MCP server

Settings → Integrations → **ads MCP server** → Ad accounts.

This list is currently empty. Adding the new ad account here is what allows campaigns,
ad sets and creatives to be built directly rather than by hand in Ads Manager.

### 5. Pixel + Conversions API

Events Manager → Connect Data Source → Web → `Alphalogix Web`.

Install on **both**:
- alphalogix.com.au
- **msp.alphalogix.com.au** ← the free calculator. Do not skip this. Someone using a
  CapEx/OpEx calculator is actively costing out IT spend. Highest-intent audience the
  business has, and it is currently invisible.

Add Conversions API if available (Wordpress: the official Meta plugin).

### 6. Domain verification

Business Settings → Brand Safety → Domains → add `alphalogix.com.au`, verify by DNS
TXT record. Required for iOS attribution.

### 7. Events

| Event | Fires on |
|---|---|
| `Lead` | Contact form submit / booking confirmed |
| `CompleteRegistration` | Calculator signup |
| `ViewContent` | Service pages |

Aggregated Event Measurement → prioritise `Lead` first.

### 8. Lead Generation ToS

Accept at **facebook.com/legal/leadgen/tos** using the Alphalogix Page. Instant form
campaigns will not run without it, and it's easy to miss until a campaign errors.

### 9. Instant Forms

Page → Publishing Tools → Forms Library.

**Form A — Free Security Review**
- Intro: "We'll tell you what's actually exposed. Even if you never hire us."
- Fields: Name, Business email, Phone, Company, "How many staff?" (1–10 / 11–50 / 51–150 / 150+)
- Use **Higher Intent** — fewer, better leads. Worth it at this budget.

**Form B — Free Site Walkthrough**
- Intro: "We'll tell you what your existing cameras can already do before you spend anything."
- Fields: Name, Business email, Phone, Company, "How many sites?", "How many cameras?"

Both: privacy policy URL, and a follow-up screen with a direct booking link and phone
number.

### 10. Naming convention

```
Campaign: ALX | <PILLAR> | <OBJECTIVE> | <MONTH>
Ad set:   <GEO> | <AUDIENCE> | <AGE>
Ad:       <SCRIPT> | <RATIO> | <HOOK>

ALX | CYBER | LEADS | SEP26
SYD50 | BROAD | 30-60
S01 | 9x16 | hookC
```

## Pre-launch checklist

- [ ] Business details complete, verification submitted
- [ ] Two-factor authentication enabled
- [ ] Ad account created — **AUD, Australia/Sydney**
- [ ] Payment method attached
- [ ] Ad account granted in ads MCP server
- [ ] Pixel firing (Meta Pixel Helper) on **both** domains
- [ ] Lead Gen ToS accepted
- [ ] Both forms tested end to end — submit one yourself
- [ ] Lead notifications to a monitored inbox **and** a phone
- [ ] Someone owns the 5-minute callback in business hours

That last item is not admin. It's the highest-leverage line on the list.

## Note on followers

63 on Facebook, 59 on Instagram. **This does not matter for ads** — paid reach is
bought, not earned, and follower count has no bearing on delivery or cost. It only
gates Meta's own Page insights, which unlock at 100. Don't spend money chasing it.
