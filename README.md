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

## Putting the sites on Netlify (one time, about 5 minutes)

Do this once per site. Repeat for the second folder.

1. In Netlify: **Add new site → Import an existing project → GitHub**, and pick this repo.
2. **Base directory:** `startup-hub` (or `grant-finder` for the second site).
3. **Build command:** leave empty. **Publish directory:** `startup-hub` (or `grant-finder`).
4. Deploy. Rename the site under **Site configuration → Change site name** (for example `alloy-startup-hub`).
5. For the Startup Resource Hub only: under **Forms → Form notifications**, add an email notification so new submissions get sent to whoever reviews them.

Until then, the GitHub Pages copy works as a preview (the submit form only works on Netlify).

## What changed from the Base44 version

- Listings live in JSON files instead of the Base44 database.
- No admin login or dashboard. Edits happen in the JSON files.
- "Submit a Resource" uses Netlify Forms. Submissions wait in the Netlify dashboard for review.
- The Grant Finder's AI "discover grants" button was removed (it ran on Base44's AI). The calendar download still works.
- The Grant Finder badge now shows the date the list was actually last reviewed (`last_reviewed` in `grants.json`) instead of always showing today's date, and grants with a past deadline hide themselves.
- Logos are stored in each site's `assets/` folder instead of Base44's image host.
