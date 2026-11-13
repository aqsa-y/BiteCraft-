# AGENTS.md

This repository is a lightweight Vite + React app.

## Run and validate
- Install dependencies: `npm install`
- Start locally: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Test: `npm test`

## Coding expectations
- Keep changes surgical and consistent with the existing app structure.
- Prefer React function components and small, clear state updates.
- Keep styling in the existing CSS files unless a new file is clearly warranted.
- Preserve accessibility and responsive behavior.
- Avoid adding unnecessary dependencies or large refactors.

## Food photography
- Store food photos locally under `public/images`; do not rely on remote image URLs at runtime.
- Give every food record a matching local image path and meaningful `imageAlt` text.
- Keep food photos at a consistent 4:3 aspect ratio and use `object-fit: cover`.
- Record photo sources in `src/data/IMAGE_SOURCES.md` and verify images load in the production preview.

## Project layout
- `src/main.jsx` bootstraps the app.
- `src/App.jsx` contains the root UI.
- `src/App.css` holds component-specific styles.
- `src/index.css` contains global/base styles.

## Before finishing
- Run the smallest relevant validation command, typically `npm run build` and/or `npm run lint`.
- Keep the output focused and avoid unrelated cleanup.
