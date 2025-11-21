# Job Application Portal

Small React app to demo a job application flow: a submission form and a list view.

This project was bootstrapped with Create React App and has a lightweight mock backend option using `json-server` (configured to use `db.json`). The front-end uses Material UI for styling.

## Features
- Submit job applications via a form with client-side validation.
- View and filter submitted applications.
- Two persistence modes: `json-server` (recommended) or localStorage (for quick demos).

## Prerequisites
- Node.js (16+ recommended) and npm
- Optional but recommended: `json-server` (install globally or use `npx`)

## Install
From the project root (`job-application-portal`):

```powershell
npm install
```

## Run (development)

Start the mock API (recommended):

```powershell
npx json-server --watch db.json --port 4000
```

Start the React dev server (use a separate terminal):

```powershell
cd .\job-application-portal
$env:PORT=3001; npm start
```

Notes:
- The app may prompt to run on another port if `3000` is busy — in earlier runs it used `3001`.
- The default `BACKEND_URL` is `http://localhost:4000/applications` (see `src/api.js`).

## API toggle (localStorage vs json-server)

Open `src/api.js`. The `BACKEND_URL` variable controls persistence:
- If `BACKEND_URL` is a URL (e.g. `http://localhost:4000/applications`) the app will `fetch`/`POST` to that endpoint.
- If `BACKEND_URL` is an empty string, the app reads/writes the `applications` key in `localStorage`.

## Material UI

This repo uses Material UI (`@mui/material`) and Emotion for styling. Components were updated to MUI for a modern UI (AppBar, TextField, Table, Buttons, Grid).

## Important implementation notes
- Resume handling is minimal: the form stores only `resume.name` (filename) in the mock API/localStorage — there is no file upload endpoint.
- Validation lives in `src/components/ApplyForm.js` (email regex, 10-digit phone, numeric experience).
- Filtering logic is in `src/components/ApplicationList.js` and expects `experience` to be numeric or numeric-string.

## Scripts
- `npm start` — start the CRA dev server
- `npm test` — run tests (react-scripts)
- `npm run build` — build production bundle

## Optional: start both servers with one command

You can add a `start:dev` script that uses `concurrently` to run both the dev server and `json-server`. Example:

```json
"dev": "concurrently \"npm:start\" \"npx json-server --watch db.json --port 4000\""
```

Install `concurrently` with:

```powershell
npm install --save-dev concurrently
```

## Testing & CI

There are no project-specific tests yet. The repository includes default Create React App test setup. Ask me to add unit tests for the form and list components if you want.

## Where to make changes
- UI/routes: `src/App.js` and `src/components/`
- API behavior: `src/api.js`
- Mock data: `db.json`

If you'd like, I can add a `start:dev` script, implement real file uploads, or add unit tests and CI configuration. Tell me which to do next.
**Repository Summary**
- **Type:** Small React app bootstrapped with Create React App.
- **Purpose:** Simple job-application portal with a form (`/apply`) and a list view (`/application`).
- **Mock backend:** `db.json` used by `json-server` (optional). LocalStorage fallback available.

**Key Files**
- `src/api.js`: central API toggle. Change `BACKEND_URL` to point at a running `json-server` (default `http://localhost:4000/applications`) or set to empty string to operate in localStorage mode.
- `src/components/ApplyForm.js`: form validation and submit flow — the form saves only the resume filename for demo purposes.
- `src/components/ApplicationList.js`: fetches and filters applications; expects an array of objects with `name`, `email`, `phone`, `experience`, `resume`.
- `db.json`: JSON store used by `json-server` with root `applications` array.

**How the app works (big picture)**
- UI: React (react-scripts) with client-side routing in `src/App.js` using `Routes` / `Route`.
- Data flow: `ApplyForm` calls `submitApplication()` in `src/api.js`. If `BACKEND_URL` is set, requests POST/GET to that endpoint; otherwise it reads/writes `localStorage` key `applications`.
- Mock API: When `json-server` runs on `db.json`, `fetchApplications()` GETs `http://localhost:4000/applications` and `submitApplication()` POSTs to the same.

**Developer workflows & commands**
- Run app: `npm start` (runs Create React App dev server on `http://localhost:3000`).
- Run tests: `npm test` (uses `react-scripts test`).
- Build: `npm run build`.
- Start mock backend (recommended for end-to-end testing):
  - Install `json-server` (`npm i -g json-server`) or use `npx json-server`.
  - Run: `json-server --watch db.json --port 4000` (from repo root). This matches the default `BACKEND_URL` in `src/api.js`.

**Project-specific conventions & pitfalls**
- `BACKEND_URL` toggle in `src/api.js` is the single switch between localStorage and json-server — change it when testing locally.
- Resume handling is intentionally minimal: `ApplyForm` stores only `resume.name`. Do not expect file upload handling on the backend.
- Validation rules live inline in `ApplyForm.js` (email regex, 10-digit phone, numeric experience). Modify here for behavior changes.
- `ApplicationList` assumes `experience` is numeric or numeric-string; filters coerce with `Number()`.

**Examples & snippets**
- Start both servers (PowerShell):
```
npm start; npx json-server --watch db.json --port 4000
```
- Example application object (what `ApplicationList` expects):
```
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "1234567890",
  "experience": "3",
  "resume": "jane_resume.pdf"
}
```

**Where to look for changes**
- To alter persistence strategy, edit `src/api.js` only.
- To change UI/routes, edit `src/App.js` and the components in `src/components/`.
- To modify validation rules or resume behavior, edit `src/components/ApplyForm.js`.

**When to ask for human help**
- If you need file upload handling (binary storage) or real backend integration — this repo only shows demo behavior.
- If tests fail due to environment differences (React version, router), ask for the target browser/runtime.

If any of these details are unclear or you'd like more examples (unit tests, CI, or extended backend examples), tell me which area to expand.
