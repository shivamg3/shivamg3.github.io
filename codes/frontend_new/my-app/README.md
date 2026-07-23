# Shivam Garg — personal website

React 19 + Vite site deployed to GitHub Pages with `npm run deploy`.

## Development

```bash
npm ci --legacy-peer-deps
npm run dev
npm run lint
npm test
npm run build
```

## Personalized scheduling

The homepage supports signed, expiring personal meeting invitations backed by Cal.com. Private signing material stays local; the site contains only public verification keys.

See [Personalized scheduling](docs/personalized-scheduling.md) for Cal.com setup, key generation, invitation commands, privacy guidance, testing, rotation, and GitHub Pages limitations.
