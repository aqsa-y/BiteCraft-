# AGENTS.md

This repository is a lightweight Vite + React app.

## Run and validate
- Install dependencies: `npm install`
- Start locally: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

## Coding expectations
- Keep changes surgical and consistent with the existing app structure.
- Prefer React function components and small, clear state updates.
- Keep styling in the existing CSS files unless a new file is clearly warranted.
- Preserve accessibility and responsive behavior.
- Avoid adding unnecessary dependencies or large refactors.

## Project layout
- `src/main.jsx` bootstraps the app.
- `src/App.jsx` contains the root UI.
- `src/App.css` holds component-specific styles.
- `src/index.css` contains global/base styles.

## Before finishing
- Run the smallest relevant validation command, typically `npm run build` and/or `npm run lint`.
- Keep the output focused and avoid unrelated cleanup.
