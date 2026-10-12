# Alloy Growth Lab founder hubs

Two small static websites for Alloy Growth Lab. No build step, no framework, no database. Each site is plain HTML, CSS and JavaScript that reads its listings from a JSON file.

| Site | Folder | Listings live in |
| --- | --- | --- |
| Startup Resource Hub | `startup-hub/` | `startup-hub/data/resources.json` (categories in `startup-hub/data/groups.json`) |
| Small-Business Grant Finder | `grant-finder/` | `grant-finder/data/grants.json` |

The repo root `index.html` is just a landing page linking to both.

## Before any content change, read HANDOFF-NOTES.md

`HANDOFF-NOTES.md` is the operating process: roles, the routines (monthly grant review, new grants, submissions, quarterly link check) with ready-made prompts, and the bar every listing must clear (section 3). Follow it. In short:

- Never add or edit a grant from an aggregator, news article, search snippet or your own memory. Verify every field against the funder's official page and show the person the evidence.
- Propose changes and wait for a person's yes before editing listings.
- Until the Base44 sites are unpublished, tell the person any content change also has to be made in the Base44 app.

## Most common job: add, edit, or remove a listing

Almost every request will be "add this resource", "remove that grant", "fix this link". Do it by editing the JSON file only. Never touch `app.js` or HTML for a content change.

### Startup Resource Hub entry

```json
{"title": "How to Talk to Users — Y Combinator", "url": "https://www.ycombinator.com/library/6g-how-to-talk-to-users", "group_id": "product-design", "subcategory": "customer-development"}
```

- `group_id` and `subcategory` must be ids that exist in `startup-hub/data/groups.json`. Pick the closest fit; ask if unsure.
- The page shows the count automatically. Order within a subcategory follows file order.

### Grant Finder entry

```json
{"title": "...", "description": "One or two plain sentences.", "funding": "$10,000", "deadline": "December 18, 2026", "best_for": "Who should apply", "urgency": "upcoming", "category": "general", "url": "https://..."}
```

- `urgency`: `closing_soon` (dated deadline within 30 days), `upcoming` (dated deadline further out), or `rolling` (no fixed deadline). The site doesn't calculate this; recheck it at each monthly review.
- `category`: `tech`, `health`, `infra`, or `general`.
- `deadline`: write a real date like `December 18, 2026` when there is one. The page hides grants whose dated deadline has passed and puts dated ones in the calendar download. Text like `Rolling` or `Varies` is fine for open-ended programs. Never write `Rolling through <date>`: anything containing "Rolling" is treated as open-ended and never hides itself, so write the end date instead.
- After reviewing or updating the list, set `last_reviewed` at the top of `grants.json` to today's date (`YYYY-MM-DD`). The page shows it as "List reviewed <date>". Don't change it unless the list was actually checked.

### Checks before committing

1. The JSON still parses: `python3 -m json.tool startup-hub/data/resources.json > /dev/null` (and the same for `grants.json`).
2. Links are full `https://` URLs and open the actual program page, not a homepage or a pay-to-apply middleman site.
3. Grants should be real, currently open, and relevant to Alloy founders (Greater Cincinnati / Ohio, or national). Flag out-of-state or expired programs instead of adding them silently.
4. Preview locally: `python3 -m http.server 8000` from the repo root, then open `http://localhost:8000/startup-hub/` or `/grant-finder/`. Opening the HTML file directly won't load the data.

## Submissions

`startup-hub/submit.html` posts to Netlify Forms. Submissions show up in the Netlify dashboard under Forms; nothing publishes automatically. To approve one, add it to `resources.json` like any other entry.

## Hosting

Each folder is deployed as its own Netlify site from this repo (Base directory = the folder, no build command, publish directory = the folder). Pushing to `main` redeploys both. See README.md.

## Style

Keep the existing look. Colors are CSS variables at the top of each site's stylesheet. Logos are in each site's `assets/` folder.
