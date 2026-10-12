# Grant Finder handoff notes (October 12, 2026)

> **Links were not opened directly** (this session's network blocked every site), so everything below comes from web search. **Click each replacement URL before using it.**

This covers the 23 grants in `grant-finder/data/grants.json` only. The 91 Startup Resource Hub links were not checked. Nothing in the JSON was changed; Antony decides what to apply.

**Summary:** keep 3, fix 6 (for 3 of those, removing is also an option), remove 14. Only one Ohio-specific grant is on the list, and its link goes to a paid aggregator.

| # | Grant | Recommendation |
| --- | --- | --- |
| 1 | NSF America's Seed Fund | Keep |
| 2 | SBIR Topics | Keep |
| 3 | Burroughs Wellcome Climate & Health | Remove (closed) |
| 4 | Secretsos Grant | Fix or remove (charges an application fee) |
| 5 | NASE Growth Grant | Fix |
| 6 | Verizon Digital Ready | Keep |
| 7–8 | Skip $1,000 / Skip $10,000 | Remove (Alloy blocks Skip elsewhere) |
| 9 | NIH Small Business Research | Fix |
| 10 | EDA Investment Assistance | Fix or remove |
| 11 | SBA STEP Grants | Fix |
| 12–13 | Two Minnesota health grants | Remove |
| 14, 18 | Two Vermont Working Lands grants | Remove |
| 15–16 | Somerset Hills (NJ), NVRH (VT) | Remove |
| 17 | Restaurant Accelerator (Grubhub) | Remove (no 2026 round) |
| 19 | UArctic Entrepreneurship Fund | Remove |
| 20–21 | Mississippi Arts Commission (2) | Remove |
| 22 | Homeland Security EOC Grants | Remove |
| 23 | Ohio Small Business Support Grants | Fix (it's the one Ohio grant) or remove |

Numbers follow the order in `grants.json`.

---

## 1. Broken or redirecting links

**Not checked.** No URL could be opened from this session. Search did turn up two links that have probably moved:

- **Burroughs Wellcome (#3):** the fund's page now appears to be at `bwfund.org/grants/...`, while ours points to `bwfund.org/funding-opportunities/...`. This doesn't matter if the grant is removed (see section 3).
- **NASE Growth Grant (#5):** NASE's current grants page appears to be `https://www.nase.org/become-a-member/grants-and-scholarships` *(unverified)*, while ours points to a deeper `.../member-benefits/business-resources/growth-grants` path. **Fix** to the new URL after clicking it.

A full link check (both hubs) still needs to be done from a machine with normal internet access.

## 2. Middleman or paywalled pages

| # | Grant | Current link | Problem | Recommendation |
| --- | --- | --- | --- | --- |
| 23 | Ohio Small Business Support Grants | `ohio.grantwatch.com/...` | GrantWatch hides current grant details behind a paid subscription. I couldn't identify which real program this listing is. Nothing matching "up to $5,000, due Dec 18, 2026" turned up. | **Fix or remove.** Our listing can't be traced to a real program, so remove it as written. Ohio programs Antony could add in its place: **JobsOhio Small Business Grant** (rolling, up to $50,000, through a regional partner such as REDI Cincinnati) and **Ohio TechCred** (employer training reimbursement, window reported as Oct 1–30, 2026). Both are unverified, so find their official pages before adding. |
| 9 | NIH Small Business Research Grants | `grants.nih.gov/grants/guide/COVID-Related.cfm` | Official NIH site, but the wrong page: a list of COVID-era notices. | **Fix** to `https://seed.nih.gov/` *(unverified)*, NIH's small-business funding hub. NIH's SBIR/STTR parent announcements reportedly reopened after the April 2026 reauthorization. Upcoming due dates are reported as Jan 5 and Apr 5, 2027. Also remove the COVID wording from the description. |
| 10 | EDA Investment Assistance | `uschamber.com/...` | A US Chamber article, not the program. Also, EDA Public Works grants go to local governments, nonprofits and universities (awards from about $100,000, with a required cost-share match). Small businesses can't apply. | **Fix** to EDA's own page, `https://www.eda.gov/funding/programs/public-works` *(unverified; I couldn't find it through search)*, and reword "best for" to economic-development organizations. Or **remove**, because founders can't apply directly. |
| 11 | SBA STEP Grants | `sba.gov/.../grants` | SBA's general grants page. Founders apply to STEP through their state, not SBA. | **Fix** to SBA's directory of state STEP offices, `https://www.sba.gov/funding-programs/grants/state-trade-expansion-program-step/directory-step-awardees` *(unverified)*. Ohio runs STEP money through the Department of Development's export grants (IMAGE and the Export Training Grant), so a link to that Ohio page would fit Cincinnati founders even better if Antony can find it. |
| 4 | Secretsos Grant | `secretsos.com/grants/` | The program's own page, but it charges an application fee (reported as $15 in 2024; the current amount is unconfirmed). Sources say it pays $2,500 a quarter and excludes AK, FL, HI, NY and RI, so Ohio founders qualify. | Recommend **remove**, because it charges to apply. If Alloy is fine with a small fee, **keep** and add "application fee" to the description. |
| 15–17, 19–22 | Somerset Hills, NVRH, Restaurant Accelerator, UArctic, Mississippi ×2, Homeland Security EOC | `grantable.co/...` category pages | Aggregator category pages, not program pages. | All are recommended for removal below, so they don't need new links. |
| 14, 18 | Vermont Working Lands ×2 | `vermontbiz.com/...` | A news article. | Recommended for removal below. |

## 3. Expired or out-of-date grants

| # | Grant | What search found | Recommendation |
| --- | --- | --- | --- |
| 3 | Burroughs Wellcome Climate Change & Human Health Seed Grants | Last review cycle was **July 23, 2026**. Funding ran Fall 2023 to Summer 2026. It's also for academic researchers, not founders. Its "Rolling through Jul 2026" deadline means the page will never hide it automatically. | **Remove** |
| 17 | Restaurant Accelerator and Community Fund Grant (National ACE + Grubhub) | The 2025 round ran Oct 1–24, 2025, and recipients were announced Dec 2, 2025. No 2026 round has been announced. It's national and would suit Cincinnati restaurants if it returns. | **Remove for now.** If it comes back, re-add it with the National ACE page (`https://www.nationalace.org/`) as the link. |
| 16 | NVRH Community Health Fund | NVRH's own page shows the window closed **Oct 17, 2025**; our "October 17, 2026" seems to be a year-labeling error. Vermont-only. | **Remove** |
| 15 | Somerset Hills Community Health Foundation Grant | The foundation's page says the 2026 cycle closed **Feb 1, 2026**. Our Oct 15, 2026 date came from an aggregator. New Jersey only. | **Remove** |
| 22 | Homeland Security Emergency Operations Center Grants | The FY2026 FEMA program closed **July 15, 2026**. Only state governments can apply. It has nothing to do with Mississippi, despite where we found it. | **Remove** |
| 13 | Primary Care Residency Expansion (MN) | The latest official deadline found was Sept 5, 2025. The Oct 16, 2026 date comes only from an aggregator. It's for medical residency programs. | **Remove** |
| 12 | Mental Health Cultural Community Continuing Education (MN) | Minnesota's own grants page lists the timing as "TBD". The Oct 26, 2026 date comes only from an aggregator. It's for clinical supervisors. | **Remove** |

## 4. Grants that don't fit Cincinnati founders

| # | Grant | Why | Recommendation |
| --- | --- | --- | --- |
| 7–8 | Skip $1,000 Instant Grants / Skip $10,000 Grants | National. The $1,000 drawing reportedly needs no purchase, but one of the two $10,000 awards each cycle is limited to paid Skip Plus/Pro members. Both entries also point to the same URL. Alloy's other hub blocks Skip as pay-to-apply. | **Remove both**, to match Alloy's existing policy. |
| 14 | Service Provider and Producer Association Grant (VT) | Real and open (Sept 17 – Nov 5, 2026), but Vermont-only. | **Remove** |
| 18 | Working Lands Business Enhancement Grant (VT) | Real and open (Oct 9 – Dec 10, 2026), but Vermont-only. | **Remove** |
| 19 | UArctic Entrepreneurship Fund | Real and open until **Oct 31, 2026**, but only for products that benefit the Arctic. | **Remove** |
| 20 | Mississippi Arts Commission Project Grants | Mississippi-only, and for-profit businesses can't apply. Our amount ($25,000–$500,000) is wrong; sources say $250–$5,000. | **Remove** |
| 21 | Mississippi Arts Commission Mini-Grants | Same problems. Ours says $20,000–$100,000; sources say $200–$1,000. | **Remove** |

## Keep as is

| # | Grant | Notes |
| --- | --- | --- |
| 1 | NSF America's Seed Fund | Open. Founders must submit a Project Pitch first. Next full-proposal deadline reported as **Nov 4, 2026**. Phase I awards up to $305,000. The description's "~$200M annually" could be updated (sources say about $250M for FY2026). |
| 2 | SBIR Topics | SBIR/STTR were reauthorized through 2031 in April 2026, and agencies are posting new topics. |
| 6 | Verizon Small Business Digital Ready | Open. Take 2 courses by **Dec 7, 2026** to unlock the application. 10 grants of $10,000 a month through Dec 2026. Run by LISC. |

(#5 NASE also stays, but needs its link fixed; see section 1. It's for NASE members only, and membership is paid. Grants of up to $4,000, reviewed quarterly.)

## After applying changes

1. Check that the JSON still parses: `python3 -m json.tool grant-finder/data/grants.json > /dev/null`
2. Set `last_reviewed` in `grants.json` to the date the changes are made.
3. Removing the 14 grants marked remove leaves 9. Only one of those (#23 Ohio, Dec 18) has a real date in the file, and it's flagged for replacement. So the calendar download could end up empty unless real dates are added (for example NSF's Nov 4 deadline). It's worth adding a few real Ohio or Cincinnati programs (JobsOhio, Ohio TechCred, local CDFI or chamber grants) so the list stays useful.
