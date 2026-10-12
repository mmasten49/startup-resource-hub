# Operating the Alloy founder hubs

How the Startup Resource Hub and the Small-Business Grant Finder are kept accurate after handoff. CLAUDE.md covers the file formats. This document covers who does what, when, and the bar a listing has to clear.

**The one rule behind everything here:** a listing goes on an Alloy-branded page only after a person has checked it against the program's own official page. Search results, aggregator sites, AI suggestions and news articles are leads, never sources. The October 2026 audit (bottom of this file) is what happens when that rule is skipped.

---

## 1. Roles

| Role | Who | Does |
| --- | --- | --- |
| Owner | Antony Seppi | Approves anything that changes what founders see. Decides exceptions to the rules below. |
| Maintainer | Whoever Antony assigns | Runs the routines in section 4, verifies listings, makes the edits. |
| Claude Code | Used by either | Does the research, checking and file edits. Proposes changes; does not publish without a person's yes. |

If no maintainer is assigned, the owner runs the monthly review. Skipping it is how a grant list goes stale.

## 2. How a change flows

```
Lead (search, newsletter, submission, partner tip, AI suggestion)
   │
   ▼
Verify against the official program page  ──fails──▶  Drop it. Note why in the commit message if it was submitted.
   │ passes every check in section 3
   ▼
Edit the JSON file (one listing per commit where practical)
   │
   ▼
Run the pre-commit checks (CLAUDE.md)  ──▶  Commit with a clear message  ──▶  Push to main  ──▶  Site redeploys
```

**Transition rule (until the Base44 versions are unpublished):** founders still see the Base44 sites. Any content change has to be made in both places, the JSON file here and the Base44 app, or the two drift apart. Once Netlify is live and Base44 is unpublished, this repo is the only source of truth.

## 3. The bar a listing has to clear

### Grant Finder: every check must pass

| Check | Pass means | Common failure |
| --- | --- | --- |
| Official source | The `url` is the funder's own program page | grantable.co, grantwatch.com, news articles, chamber blog posts |
| Real and current | The page shows an open round, or a confirmed upcoming round with dates | Last year's cycle relabeled with this year's date |
| Eligible | For-profit small businesses or founders can apply, and Ohio/Cincinnati applicants qualify (Ohio-specific or national) | State-only programs elsewhere; grants only governments, universities or nonprofits can apply for |
| Free to apply | No application fee and no paid purchase to enter | Pay-to-apply platforms (Alloy blocks Skip for this reason) |
| Facts match the page | `funding`, `deadline`, `best_for` and `description` are copied from the official page, not an aggregator | Amounts inflated 100x; wrong audience |
| Deadline is usable | A real date (`December 18, 2026`) if one exists. `Rolling` only for truly open-ended programs | `Rolling through Jul 2026`: the site treats anything containing "Rolling" as open-ended, so it never hides itself. Write the end date instead |

**Exceptions** (membership-gated grants, programs founders reach through an intermediary) need the owner's yes, and the description must say so in plain words, for example "NASE members only; membership is paid."

**Setting `urgency`** (the site does not calculate it, so set it by this rule and recheck monthly):
- `closing_soon`: dated deadline within 30 days
- `upcoming`: dated deadline more than 30 days out
- `rolling`: no fixed deadline

**Setting `category`:** `tech` for R&D and SBIR-style funding, `health` for health and life science, `infra` for infrastructure and disaster recovery, `general` for everything else.

### Startup Resource Hub

Lower stakes, lighter bar: the link opens the actual guide or tool (not a homepage or paywall), it is free or clearly labeled as a paid book or product, and it fits a group and subcategory in `groups.json`.

## 4. Routines

### Monthly grant review (first week of each month, about 30 minutes)

The most important routine. Paste into Claude Code from a session that can open websites:

```
Run the monthly Grant Finder review using HANDOFF-NOTES.md section 3.
For every grant in grant-finder/data/grants.json: open the official page, confirm it is still open, and check funding, deadline, eligibility and fee against the page. Recalculate urgency from today's date.
Then show me a table: grant, status (ok / update / remove), what changed, evidence URL.
Do not edit anything until I approve. After I approve, make the edits, set last_reviewed to today, run the pre-commit checks, and commit as "Grant Finder: monthly review YYYY-MM".
```

Outcome to aim for: no expired grants on the page, every urgency label correct, `last_reviewed` within the last 31 days.

### Adding new grants (during the monthly review, target 2 to 3 a month until the list has real Ohio coverage)

Where to look for leads (still verify each on its own official page):
- Ohio Department of Development (including Ohio's STEP export grants)
- JobsOhio and REDI Cincinnati
- Hamilton County Office of Small Business, Cincinnati-area CDFIs and chambers
- SBA, SBIR.gov, Grants.gov, NIH SEED, NSF America's Seed Fund

```
Find 3 grants currently open to for-profit small businesses in Ohio or Cincinnati, or open nationally, using HANDOFF-NOTES.md section 3. Use the sources listed in section 4 as starting points, but cite only official program pages. For each, show me the proposed JSON entry and the evidence for every field. Do not add anything until I approve.
```

### Resource submissions (within a week of each one)

Submissions arrive in Netlify under Forms (and by email if notifications are on). Check each against the Resource Hub bar in section 3. Approved ones are added to `resources.json`; rejected ones need no action. Nothing publishes automatically.

### Quarterly link check (January, April, July, October)

```
Open every URL in startup-hub/data/resources.json and grant-finder/data/grants.json. List anything that is broken, redirects to a homepage, or now sits behind a paywall, with a suggested replacement from the same publisher. Do not edit anything until I approve.
```

Note: Claude Code cloud sessions can block outside websites by default. If every link fails, that is the network setting, not dead links. Run this from a session with network access enabled, or locally.

## 5. Records

- **Git history is the change log.** One clear commit message per change, for example `Grant Finder: add JobsOhio Small Business Grant` or `Grant Finder: remove UArctic Fund (closed Oct 31)`.
- **`last_reviewed`** in `grants.json` is changed only after a full monthly review. It is shown publicly as "List reviewed <date>", so it must be true.
- **Nothing is lost.** Every removed listing is recoverable from git history.

## 6. Current state (October 12, 2026)

**Grant Finder: 8 grants, all real, none Ohio-specific, none with a dated deadline** (so the calendar download is disabled).

Open decisions for the owner:
1. **Secretsos Grant** charges an application fee, which fails the "free to apply" check. Remove, or keep as a labeled exception.
2. **EDA Investment Assistance** is for governments and economic development organizations, not founders. Remove, or keep as a labeled exception.
3. **NASE Growth Grant** requires paid membership. Already labeled in "best for"; confirm it stays as an exception.
4. **Verizon Digital Ready** says `Rolling through Dec 2026`, which will never hide itself. At the next review, change the deadline to its actual end date.

Setup still to do (in this order):
1. Transfer this repo to the owner's GitHub account.
2. Connect both folders to Netlify under Alloy's account (steps in README.md). Turn on Forms email notifications for the Resource Hub.
3. Unpublish the two Base44 apps. From then on, the transition rule in section 2 no longer applies.
4. Run the first quarterly link check. The 91 Resource Hub links have never been checked.

---

## Appendix: why these rules exist (October 2026 audit)

During the move off Base44, all 23 grants were researched. Only 8 survived, and 4 of those needed corrected links. The other 15 were removed: out-of-state programs (Minnesota, Vermont, New Jersey, Mississippi), rounds that had already closed (including one listed with a deadline a year off), amounts inflated roughly 100 times, a grant only state governments could apply for, pay-to-apply Skip grants, and an "Ohio" grant that could not be traced to any real program. Most were added on October 2, 2026 by an AI discovery button that pulled from aggregator sites and published without a human check. That button was removed in the migration.

Full findings: commit `642ca44`. Changes applied: commit `556ec8f`. The removed Base44 records are in that app's trash and can be restored.
