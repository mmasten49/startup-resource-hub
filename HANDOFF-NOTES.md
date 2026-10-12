# Operating the Alloy founder hubs

How the Startup Resource Hub and the Small-Business Grant Finder are kept accurate after handoff. CLAUDE.md covers the file formats. This document covers who does what, when, and the bar a listing has to clear.

**The one rule behind everything here:** a listing goes on an Alloy-branded page only after a person has checked it against the program's own official page. Search results, aggregator sites, AI suggestions and news articles are leads, never sources. The October 2026 audit (bottom of this file) is what happens when that rule is skipped.

### Quick reference

| What | Where |
| --- | --- |
| This repo (all content and code) | `github.com/mmasten49/startup-resource-hub`, moving to the owner's GitHub account (section 6) |
| Grant listings | `grant-finder/data/grants.json` |
| Resource listings | `startup-hub/data/resources.json` |
| Live sites | Netlify URLs: fill in here after setup step 2 in section 6. Until then, the Base44 versions are live |
| Resource submissions | Netlify dashboard → the Resource Hub site → Forms |
| Weekly review | Scheduled task on the owner's Claude account, Fridays 8:00 AM Eastern |
| Newsletter | Alloy Growth Lab Weekly, Mondays 8:30 AM. Drafted in the owner's Claude ("Alloy Weekly" project) from his weekly notes plus Friday's grant blurb, then sent from Constant Contact |

### Words used here

- **`main`**: the live version. Whatever is on `main` is what founders see.
- **Pull request (PR)**: a proposed set of changes waiting for approval. It shows exactly what would change, line by line.
- **Merge**: approving a pull request. Its changes go onto `main` and the site updates within a minute or two.
- **Branch**: a draft copy where changes are made before they're proposed. You never need to touch one directly.

---

## 1. Roles

| Role | Who | Does |
| --- | --- | --- |
| Owner | Antony Seppi | Approves anything that changes what founders see. Decides exceptions to the rules below. |
| Maintainer | Whoever Antony assigns | Runs the routines in section 4, verifies listings, makes the edits. |
| Newsletter editor | Antony Seppi, until the next Castleberry intern takes over | Pastes the week's notes and the grant blurb into the Alloy Weekly project, then copies the draft into Constant Contact. Copies the grant blurb from that week's merged pull request into Monday's newsletter. If nothing was merged, leaves the grant section out rather than reusing last week's. |
| Claude Code | Weekly scheduled task on the owner's Claude account, plus on-demand use | Does the research, checking and file edits. Opens a pull request; never pushes listing changes to `main` itself. |

The owner's one recurring job is the Friday approval (section 4, "What the owner does each Friday"). If the scheduled task stops running, the owner or maintainer runs the review by hand with the prompt in section 4. Skipping it is how a grant list goes stale.

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
Run the pre-commit checks (CLAUDE.md)  ──▶  Commit on a branch  ──▶  Open a pull request
   │
   ▼
Owner reviews and merges  ──▶  main updates  ──▶  Site redeploys
```

Small one-off fixes the owner asks for directly (for example "fix this typo" in a live Claude Code session) can go straight to `main`, because the owner is the one approving in that moment. Anything the scheduled task does always goes through a pull request.

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

**Setting `urgency`** (the site does not calculate it, so set it by this rule; the weekly review rechecks it):
- `closing_soon`: dated deadline within 30 days
- `upcoming`: dated deadline more than 30 days out
- `rolling`: no fixed deadline

**Setting `category`:** `tech` for R&D and SBIR-style funding, `health` for health and life science, `infra` for infrastructure and disaster recovery, `general` for everything else.

### Startup Resource Hub

Lower stakes, lighter bar: the link opens the actual guide or tool (not a homepage or paywall), it is free or clearly labeled as a paid book or product, and it fits a group and subcategory in `groups.json`.

## 4. Routines

### Weekly grant review (automated, Fridays)

The most important routine. A scheduled task on the owner's Claude account runs it every Friday at 8:00 AM Eastern and hands the owner one pull request. The newsletter goes out Monday at 8:30 AM, so the window to merge is Friday through Monday 8:00 AM.

**What the run does, in order:**
1. **Network check first.** Open three known-good official pages (sbir.gov, seed.nih.gov, sba.gov). If they don't load, the session can't reach websites: stop, change nothing, and report "weekly review skipped: no web access". Never mark a grant closed because its page wouldn't load.
2. **Review every listed grant** against its official page using section 3: still open, facts unchanged, eligibility and fee unchanged. Recalculate `urgency` from today's date.
3. **Find up to 3 new grants** that pass every check in section 3, starting from the sources listed under "Adding new grants" below. Ohio and Cincinnati programs first. Zero is an acceptable answer; never add a weak one to hit a number.
4. **Quarterly add-on.** If today is the first Friday of January, April, July or October, also run the quarterly link check (below) on both hubs and include proposed link fixes in the same pull request. This is the only time the run touches `startup-hub/`, and only to fix links.
5. **Open the pull request.** First, if last week's `weekly-review/...` pull request is still open, close it with the comment "Superseded by this week's review" so the owner only ever has one to look at. Then start a new branch `weekly-review/YYYY-MM-DD` from the current `main`, make the edits, set `last_reviewed` to today, run the pre-commit checks in CLAUDE.md, and open the pull request. Open one every week, even when nothing else changed: it then contains only the `last_reviewed` date, which keeps the public "List reviewed" date honest.
6. **The pull request description** contains:
   - a table of every grant: ok / updated / removed / new, what changed, and the evidence URL
   - anything the run was unsure about, listed separately and left unchanged
   - a ready-to-paste newsletter blurb for the coming Monday: "New on the Grant Finder" and "Closing soon", two to four lines each, no more. "Closing soon" only lists deadlines at least 7 days after that Monday, so nothing in the newsletter has closed by the time founders read it.

**Guardrails for the run:** never push to `main`; never use an aggregator, news article or search snippet as a source; never remove a grant on a hunch, only with evidence from its official page; never touch `startup-hub/` except for quarterly link fixes in step 4.

### What the owner does each Friday (about 10 minutes)

1. **Open the summary.** The scheduled task's notification has a three-line summary and the pull request link. GitHub also emails you when a pull request opens.
2. **Read the table** in the pull request description. Click the evidence link for anything marked new, updated or removed, and look over the "unsure" list.
3. **Decide:**
   - **All good:** click the green **Merge pull request** button, then **Confirm merge**. Done. The site updates in a minute or two.
   - **Most of it is good:** open Claude Code on the repo and say, for example, "In this week's weekly-review pull request, drop the change to the NASE grant, then I'll merge." Then merge.
   - **None of it is good:** click **Close pull request**. Nothing changes on the site.
4. **Deadline:** Monday 8:00 AM, so the newsletter blurb matches the site.

**If something looks wrong:**
- **No notification and no pull request by Friday noon:** the run failed. Run the manual fallback below, or skip the week (the site just stays as it was).
- **The summary says "skipped: no web access":** the scheduled task's environment has network access turned off. Fix it (section 7, step 1); the next Friday run will work.
- **You merged something you shouldn't have:** open Claude Code on the repo and say "Revert the last weekly-review merge." It undoes that merge in one step and the site goes back.
- **You merged but the site didn't change after a few minutes:** check the site's **Deploys** tab in Netlify for an error.

**Manual fallback** (if the scheduled task fails or is off), paste into Claude Code from a session that can open websites:

```
Run the weekly Grant Finder review exactly as described in HANDOFF-NOTES.md section 4, "Weekly grant review", steps 1 to 6. Open a pull request; do not push to main.
```

Outcome to aim for: no expired grants on the page, every urgency label correct, `last_reviewed` never more than 8 days old.

### Adding new grants (handled by the weekly review; also on demand)

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

Runs automatically as part of the first Friday review in those months (step 4 above). To run it by hand:

```
Open every URL in startup-hub/data/resources.json and grant-finder/data/grants.json. List anything that is broken, redirects to a homepage, or now sits behind a paywall, with a suggested replacement from the same publisher. Do not edit anything until I approve.
```

Note: Claude Code cloud sessions can block outside websites by default. If every link fails, that is the network setting, not dead links. Run this from a session with network access enabled, or locally.

## 5. Records

- **Git history is the change log.** One clear commit message per change, for example `Grant Finder: add JobsOhio Small Business Grant` or `Grant Finder: remove UArctic Fund (closed Oct 31)`.
- **`last_reviewed`** in `grants.json` is changed only by a completed weekly review (in its pull request). It is shown publicly as "List reviewed <date>", so it must be true.
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
3. Switch the newsletter's hub links to the new Netlify URLs (or a custom subdomain such as `resources.alloygrowthlab.com`, which never has to change again). Then unpublish the two Base44 apps. From then on, the transition rule in section 2 no longer applies. Never put GitHub Pages links in the newsletter: they change when the repo moves and stop working when it goes private.
4. Set up the weekly scheduled task on the owner's Claude account (section 7). Do this only after step 3: until Base44 is unpublished, the task's edits wouldn't reach the live site.
5. Make the repo private (repo → Settings → General → Danger Zone → Change visibility). It is public right now, so anyone can read these notes. Netlify works the same with a private repo; only the GitHub Pages preview stops.
6. Fill in the live Netlify URLs in the quick reference at the top of this file.
7. Run the first quarterly link check by hand rather than waiting for January. The 91 Resource Hub links have never been checked.8. Move newsletter drafting from ChatGPT to an "Alloy Weekly" project in the owner's Claude, and run one issue both ways to confirm the Claude draft matches before switching.

**For the next Castleberry intern:** start with this file. The intern takes over the newsletter editor and maintainer roles in section 1; the owner keeps approving the Friday pull request. Ask the owner to share the Alloy Weekly project instructions, or recreate the project from them.

## 7. Setting up the weekly scheduled task (owner, once, about 10 minutes)

1. In Claude, create a scheduled task: **Fridays, 8:00 AM Eastern**, in a cloud environment with this repo attached and **network access enabled**. The default setting can block outside websites, which makes the run skip itself. To change it: open the cloud environment menu in the session's title bar, click **Edit**, and under **Network access** choose full access. Docs: https://code.claude.com/docs/en/cloud-environments#network-access
2. Give it push access to the repo so it can open pull requests.
3. Model: Sonnet is plenty for this job and keeps usage low.
4. Turn on notifications so the summary reaches you when it finishes. Also check that GitHub emails you about new pull requests on this repo (GitHub → Settings → Notifications).
5. Use this as the task's prompt:

```
You maintain the Alloy Growth Lab Grant Finder in this repo. Read CLAUDE.md and HANDOFF-NOTES.md, then run the "Weekly grant review" in HANDOFF-NOTES.md section 4 exactly as written. Follow steps 1 to 6; never push to main. Finish with a three-line summary: grants checked, changes proposed, and the pull request link (or "skipped: no web access").
```

6. **Test it once:** run the task manually right after creating it. Confirm it opens a pull request, read it, and close or merge it. Don't wait for the first Friday to find out it's misconfigured.

The prompt stays short on purpose: the process lives in this repo, so improving the routine means editing HANDOFF-NOTES.md, not the scheduled task.

---

## Appendix: why these rules exist (October 2026 audit)

During the move off Base44, all 23 grants were researched. Only 8 survived, and 4 of those needed corrected links. The other 15 were removed: out-of-state programs (Minnesota, Vermont, New Jersey, Mississippi), rounds that had already closed (including one listed with a deadline a year off), amounts inflated roughly 100 times, a grant only state governments could apply for, pay-to-apply Skip grants, and an "Ohio" grant that could not be traced to any real program. Most were added on October 2, 2026 by an AI discovery button that pulled from aggregator sites and published without a human check. That button was removed in the migration.

Full findings: commit `642ca44`. Changes applied: commit `556ec8f`. The removed Base44 records are in that app's trash and can be restored.
