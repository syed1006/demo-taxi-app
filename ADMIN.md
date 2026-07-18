# Site Admin — /admin/

The site has a built-in owner dashboard at **`/admin/`** (not linked anywhere,
not indexed). It lets you change almost everything on the site — no code, no
server, no hosting bill. GitHub is the database, the build pipeline and the
host.

## What you can edit

| Tab | Controls |
| --- | --- |
| Routes | Add/edit/delete outstation trips (`/bangalore-to-…-taxi/` pages): fares, distances, intro copy, sights, tips, FAQs, photos |
| Packages | Add/edit/delete tour packages: hard prices per vehicle, itineraries, inclusions/exclusions |
| Airport | Coverage areas, per-area fares, which areas get their own landing page |
| Rate card | The master ₹/km rates, driver bata, airport bases, hourly packages — everything derived on the site follows |
| Fleet | Vehicle names, models, display prices, features, photos |
| Photos | Upload new photos — resized and converted to WebP **in your browser** before publishing |
| FAQs / Reviews | The FAQ page and testimonials |
| Contact & SEO | Phone/WhatsApp number, email, address, homepage title/description |

## Signing in (one-time, ~2 minutes)

The admin needs a GitHub fine-grained personal access token. The sign-in
screen walks you through it; in short: **github.com → Settings → Developer
settings → Fine-grained tokens → New**, give it access to only this repo with
**Contents: Read and write** and **Actions: Read-only**, then paste the
`github_pat_…` value into the admin. The token is stored only in your browser
and can be revoked from GitHub at any time. When it expires, paste a fresh one.

## How publishing works

1. Edit anything — the orange bar at the bottom tracks unpublished changes.
2. **Review & publish** shows a summary and sanity-checks everything (missing
   fares, order-of-magnitude price typos, broken references, bad phone
   numbers) before anything leaves your browser.
3. Publishing writes ONE commit to the repo; GitHub Actions rebuilds the site
   and your change is **live in ~2–3 minutes**. The admin shows the build
   status live.
4. If a bad edit slips through, the build's validation gate
   (`scripts/validate-data.mjs` + `scripts/validate-site.mjs`) fails the
   deploy and **the live site stays exactly as it was**. Your edits remain in
   the admin — fix and publish again.

Nothing here costs money: public repo → free GitHub Pages + unlimited Actions.

## For developers

- All admin-editable content lives in `src/data/content/*.json`. The modules
  in `src/data/*.ts` are typed wrappers that resolve image refs
  (`destinations/x.webp` → optimized `ImageMetadata` via `src/data/images.ts`).
- The admin app is `src/pages/admin.astro` + `src/scripts/admin/*` (vanilla
  TS, ~16 KB gz, loaded only on /admin/). It talks to `api.github.com`
  directly; commits use the Git Data API so JSON + photos land atomically.
- Build-time env: `PUBLIC_ADMIN_REPO` (default `syed1006/demo-taxi-app`) and
  `PUBLIC_ADMIN_BRANCH` (default `main`) control where the admin commits.
  Non-main branches show a "no auto-deploy" badge — the Pages workflow
  (`.github/workflows/publish.yml`) only deploys pushes to `main`.
- `pnpm build` = data validation → astro build → site validation. The same
  checks run in CI on every admin commit.
