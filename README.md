# driesbielen.be

## Development

```sh
nvm install
nvm use
npm ci
npm run dev
```

Node.js is pinned to the patched LTS release 24.22.1 in `.nvmrc`. React and React DOM are application dependencies, and `package-lock.json` locks the dependency tree.

## Checks

```sh
npm run typecheck
npx playwright install chromium
npm test
npm audit
npm outdated
```

`npm test` builds the production site and checks desktop/mobile navigation, all 13 project pages, the project carousel, Dutch/English CV links, missing routes, and browser/asset errors. External sites are not contacted by these checks.

## Cloudflare

Build command: `npm run build`. Output directory: `dist`.

Cloudflare supports `.nvmrc` for selecting Node.js ([build image documentation](https://developers.cloudflare.com/pages/configuration/build-image/)). If the dashboard defines `NODE_VERSION`, keep it aligned with `.nvmrc` or remove the override. Dashboard settings are not stored in this repository.

Deployment is handled by Cloudflare; the old GitHub Pages deploy command and CNAME-generation script have been removed.
