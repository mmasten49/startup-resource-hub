# Alloy Growth Lab founder hubs

The Startup Resource Hub and the Small-Business Grant Finder, moved off Base44 into plain static sites (October 2026).

- `startup-hub/`: Startup Resource Hub (91 resources in `data/resources.json`)
- `grant-finder/`: Small-Business Grant Finder (23 grants in `data/grants.json`)

No build step and nothing to pay for. Edit a JSON file, push, and the sites update.

## Editing with Claude Code

Open this repo in Claude Code and ask in plain English, for example:

- "Add this resource to the hub under Fundraising: <link>"
- "Remove any grants whose deadline has passed and update last_reviewed"
- "Check every link in the grant finder and tell me which are broken"

`CLAUDE.md` tells Claude how the files are laid out and what to check before committing.

## Putting the sites on Netlify (owner's account, one time, about 15 minutes)

Do this from the account that owns this repo, after the repo has been transferred to it. Two Netlify sites come from this one repo, one per folder.

1. Go to netlify.com and **Sign up with GitHub**, using the GitHub account that owns this repo.
2. **Add new site → Import an existing project → GitHub.** Authorize Netlify when asked, then pick this repo.
3. **Base directory:** `startup-hub`. Leave everything else blank; `startup-hub/netlify.toml` supplies the rest. Click **Deploy**.
4. **Site configuration → Change site name** → `alloy-startup-hub` (or the closest available name). The site is now at `https://alloy-startup-hub.netlify.app`.
5. Repeat steps 2 to 4 with Base directory `grant-finder` and a name like `alloy-grant-finder`.
6. On the Startup Resource Hub site only: **Forms → Enable form detection**, then **Deploys → Trigger deploy** so Netlify picks up the form. Under **Forms → Form notifications**, add an email notification to whoever reviews submissions.
7. Test: open both sites, check the grant list and the search, and send one test submission through "Submit a Resource". It should appear under Forms.
8. Put the two URLs in the quick reference at the top of HANDOFF-NOTES.md and in the newsletter.

From then on, every merge to `main` redeploys both sites automatically.

## What changed from the Base44 version

- Listings live in JSON files instead of the Base44 database.
- No admin login or dashboard. Edits happen in the JSON files.
- "Submit a Resource" uses Netlify Forms. Submissions wait in the Netlify dashboard for review.
- The Grant Finder's AI "discover grants" button was removed (it ran on Base44's AI). The calendar download still works.
- The Grant Finder badge now shows the date the list was actually last reviewed (`last_reviewed` in `grants.json`) instead of always showing today's date, and grants with a past deadline hide themselves.
- Logos are stored in each site's `assets/` folder instead of Base44's image host.
