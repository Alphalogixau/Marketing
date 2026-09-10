# Google Ads — Ready-to-Import Campaign Build

The full $3k/mo Search structure as CSVs. **Import into Google Ads Editor, review,
then post.** No API access, no developer token, no MCP required — this is why it's
the piece that could be built while the ad accounts are still being sorted.

## Files, in import order

| # | File | Contents |
|---|---|---|
| 1 | `01-campaigns.csv` | 3 campaigns with daily budgets |
| 2 | `02-keywords.csv` | 42 keywords across 6 ad groups |
| 3 | `03-negative-keywords.csv` | 70 campaign-level negatives |
| 4 | `04-responsive-search-ads.csv` | 6 RSAs, 12 headlines + 4 descriptions each |

All headline (≤30 char), description (≤90 char) and path (≤15 char) limits are
**validated** — every field passes. Nothing will be truncated on import.

## Structure

| Campaign | Daily | Ad groups |
|---|---|---|
| ALX \| Surveillance \| Search | $23 | CCTV Installation · AI Surveillance |
| ALX \| Displacement \| Search | $16 | Change IT Provider |
| ALX \| Managed IT \| Search | $20 | Managed IT Support · Cyber Security · Essential Eight |

$59/day ≈ **$1,800/mo**, matching the Google allocation in `../strategy/06-the-3k-plan.md`.

Six ad groups rather than nine. At this budget, concentration beats coverage — thin
ad groups never gather enough data to optimise.

## How to import

1. Download **Google Ads Editor** (free, desktop).
2. Sign in and download the Alphalogix account.
3. **Account → Import → From file**, one CSV at a time in the order above.
4. Review every proposed change in the preview. Editor flags policy problems before
   anything goes live — read them.
5. Set **Locations** on each campaign to **Sydney metro** (Editor's CSV import doesn't
   reliably carry geo — set it manually).
6. Set the ad schedule to business hours + 1 hour either side.
7. Add sitelink, callout and call extensions at account level.
8. **Post** — everything arrives paused. Review once more, then enable.

## Settings the CSV can't carry — set these by hand

- **Location: Sydney metro.** Set to "Presence: people in your targeted locations",
  not "presence or interest". Otherwise you pay for people in Manila researching Sydney.
- **Networks: Google Search only.** Turn OFF Search Partners and Display Network.
  Display will eat the budget with junk clicks at this spend level.
- **Bidding: Manual CPC or Maximise Clicks.** Not Target CPA — there's no conversion
  history yet, so a smart bidding strategy has nothing to learn from.
- **Ad rotation: rotate indefinitely** for the first month so you can judge RSAs fairly.

## The negatives matter more than the keywords

`03-negative-keywords.csv` carries 25 surveillance-specific negatives (`home`,
`residential`, `bunnings`, `doorbell`, `diy`, `nanny cam`…) plus 15 general ones
applied to all three campaigns.

**Without these, the surveillance campaign will be destroyed by residential traffic.**
Consumer camera search volume dwarfs commercial, and every one of those clicks is
wasted money.

## First month discipline

- **Check the search terms report twice a week.** Add negatives aggressively. This is
  where wasted spend hides, and it's the single highest-return habit in paid search.
- **Don't touch bids for the first week.** Let it gather data.
- **Watch Quality Score.** Below 5 means the landing page and keyword don't match —
  fix the page, don't raise the bid.

## Not included, deliberately

- **Broad match.** Not until there's 90 days of data. It's the fastest way to spend
  $1,800 on nothing.
- **Performance Max.** Google's black box needs conversion volume this account won't
  have for months.
- **Display / YouTube.** Wrong channel for demand capture.
