# Portfolio redesign

User constraints: traditional type, no star mark, no generated slogans or personal quotes, almost no homepage text, and no explode control.

## Pages

- Home: name, work link, procedural 3D sculpture, drag and keyboard rotation, pause.
- Work: six projects, category filters, six detail pages, source links and labelled schematics.
- About: existing profile information and original photographs.
- Education: original institutions, dates and degrees.
- Writing: article index and the existing article, preserved verbatim.
- IIT Delhi: original archive photographs, academic and team facts, source PDF.
- Contact: email, clipboard control, LinkedIn, GitHub, calendar and vCard.
- Contact card: matching serif styling and native contact links.
- Unknown URLs: 404 page.

Georgia and Times New Roman are system fonts; no font service is required. All gallery photographs are local. The sculpture loads separately and has a static fallback. System reduced-motion preferences are respected.

## Development and validation

From this application directory:

```sh
npm ci --legacy-peer-deps
npm run dev
npm test
npm run build
node scripts/verify-static.mjs
```

The maps dependency retained from the original repository declares older React peers, so installation uses legacy peer resolution.

## GitHub Pages release

The build generates directory indexes for all fourteen application routes, plus the separate contact card, 404 page, sitemap and robots.txt. Direct page loads do not depend on a client-side redirect.

```sh
node scripts/prepare-pages.mjs
node scripts/verify-static.mjs ../../..
```

The preparation helper copies built release files into the repository root without removing unrelated assets. Review the draft PR before merging or publishing.
