# Copilot instructions for BiteCraft

This repository is a small Vite + React application. Keep changes focused, production-safe, and consistent with the project’s lightweight structure.

## Project overview
- App entry: `src/main.jsx`
- Root UI: `src/App.jsx`
- Global styles: `src/index.css`
- Component styles: `src/App.css`
- Build system: Vite
- UI library: React 19

## Working conventions
- Prefer small, surgical edits over broad rewrites.
- Stay within the existing React + JSX patterns used in the app.
- Keep behavior simple and predictable; avoid adding unnecessary dependencies or state management libraries.
- Preserve the current architecture unless a user explicitly asks for a larger refactor.
- Favor readable, maintainable code over clever abstractions.

## Styling
- Keep styling in the existing CSS files unless the task clearly requires a new file.
- Match the current design language: clean, modern, minimal, and lightweight.
- Preserve responsive behavior and accessibility when modifying layout or interaction styles.
- Prefer CSS classes and existing tokens/variables rather than introducing ad hoc inline styles.

## React guidance
- Use function components and hooks consistently.
- Share state only when needed; avoid unnecessary lifting of state.
- Add accessible labels, alt text, and semantic markup for UI improvements.
- If updating a component, keep the surrounding component structure intact and minimize churn.

## Validation
- Before finishing, run the smallest relevant validation command.
- Typical commands for this app:
  - `npm install` (when dependencies are not yet installed)
  - `npm run build`
  - `npm run lint`
- If a task includes UI work, prefer a quick visual sanity check in the browser after running the app with `npm run dev`.

## Change expectations
- Do not add framework or build-system churn unless required by the task.
- Keep fixes targeted to the user’s request and avoid unrelated cleanup.
- If you need to add new files, prefer the current project structure and naming conventions.

This file is intentionally concise so that VS Code and GitHub Copilot can discover the repository’s standards automatically.
