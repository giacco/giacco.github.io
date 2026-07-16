# giacco.github.io

Personal portfolio built with React, TypeScript, Vite and Emotion, published on GitHub Pages.

## Requirements

- Node.js 24
- npm 10 or newer

## Local development

Install dependencies:

```bash
npm ci
```

Start the dev server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the built site locally:

```bash
npm run preview
```

## Node version

The repository is aligned to Node 24 for local development and CI:

- `.nvmrc` pins the local Node version
- `.github/workflows/deploy-pages.yml` builds with Node 24

If you use `nvm`, run:

```bash
nvm use
```

## GitHub Pages deploy

Deployment is handled by GitHub Actions in `.github/workflows/deploy-pages.yml`.

- Pull requests targeting `main` run the build for validation
- Pushes to `main` build the site and deploy `dist/` to GitHub Pages
- Manual runs are also available through `workflow_dispatch`

This repository is a GitHub Pages user site, so Vite uses `base: '/'`.
