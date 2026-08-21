# Meta Ads Setup — Step by Step

## Situation

There is **no Alphalogix ad account**. The two accounts on this login are:

| ID | Name | Business | Payment |
|---|---|---|---|
| `23165511` | Peter Bublé | — (personal) | **None** |
| `411185735338258` | Virvio | `464919709822021` virvioaus | Yes |

**Do not run Alphalogix ads from either.** The personal account can't bill, and the
Virvio account would permanently merge two businesses' pixel data, billing history and
ad account reputation. That can't be unpicked later, and it complicates anything from
selling either entity to just reading a clean report.

## Steps

### 1. Business Manager
business.facebook.com → Create Account. Name: **Alphalogix**. Use peter@alphalogix.com.au.
Add the ABN and business details — a completed profile reduces the odds of a review flag.

### 2. Ad account
Business Settings → Accounts → Ad Accounts → Add → Create.
- Name: `Alphalogix — Primary`
- Currency: **AUD** (permanent — get it right)
- Timezone: **Australia/Sydney** (permanent)
- Purpose: my own business

Add a payment method immediately. New accounts start with a low daily spend limit
that lifts as billing history builds; that's normal.

### 3. Claim assets
Business Settings → Pages → Add → **Alphalogix** (`103209089333340`).
Then Instagram Accounts → Add → `@alphalogixaus`.
Link the IG account to the Page so ads can run under both identities.

### 4. Pixel + Conversions API
Events Manager → Connect Data Source → Web → name it `Alphalogix Web`.
Install on **both** properties:
- alphalogix.com.au
- **msp.alphalogix.com.au** ← the free calculator. Do not skip this. Anyone who uses
  a CapEx/OpEx calculator is actively costing out IT spend. That is the highest-intent
  audience the business has, and it is currently untracked.

Add Conversions API if available (Wordpress: the official Meta plugin).

### 5. Domain verification
Business Settings → Brand Safety → Domains → add `alphalogix.com.au`, verify by DNS
TXT record. Required for iOS attribution.

### 6. Events
Configure in Events Manager:

| Event | Fires on |
|---|---|
| `Lead` | Contact form submit / booking confirmed |
| `CompleteRegistration` | Calculator signup |
| `ViewContent` | Service pages |

Then Aggregated Event Measurement → prioritise `Lead` first.

### 7. Lead Generation ToS
Accept at **facebook.com/legal/leadgen/tos** using the Alphalogix Page. Instant form
campaigns will not run without it, and this is easy to miss until a campaign errors.

### 8. Instant Forms
Page → Publishing Tools → Forms Library. Build two:

**Form A — Free Security Review**
- Intro: "We'll tell you what's actually exposed. Even if you never hire us."
- Fields: Name, Business email, Phone, Company, "How many staff?" (1–10 / 11–50 / 51–150 / 150+)
- Use **Higher Intent** (adds a review step) — fewer, better leads. Worth it at this budget.

**Form B — Free Site Walkthrough**
- Intro: "We'll tell you what your existing cameras can already do before you spend anything."
- Fields: Name, Business email, Phone, Company, "How many sites?", "How many cameras?"

Both: privacy policy URL, and a follow-up screen with a direct booking link and phone
number — many people will act immediately if given the option.

### 9. Naming convention
```
Campaign: ALX | <PILLAR> | <OBJECTIVE> | <MONTH>
Ad set:   <GEO> | <AUDIENCE> | <AGE>
Ad:       <SCRIPT> | <RATIO> | <HOOK>

ALX | CYBER | LEADS | SEP26
SYD50 | BROAD | 30-60
S01 | 9x16 | hookC
```

### 10. Before spending
- [ ] Pixel confirmed firing (Meta Pixel Helper) on both domains
- [ ] Payment method live
- [ ] Lead ToS accepted
- [ ] Both forms tested end to end — submit one yourself
- [ ] Lead notifications routed to a monitored inbox **and** a phone
- [ ] Someone owns 5-minute callback during business hours

That last one is not admin. It's the highest-leverage item on the list.
