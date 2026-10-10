# Search Page Reload Fix

## Goal
Stop the full page reload on `/search` when the dev server is opened from a LAN IP. Keep the query in the URL so that results survive a reload. Capture a search event.

## Skills and Reference
- `AGENTS.md` sections 5, 7, 11, and 12.
- `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/allowedDevOrigins.md`.

## Code Inspected
- `web/app/search/page.tsx`, `web/next.config.ts`, `web/lib/posthog-client.ts`.
- `next/dist/server/lib/router-utils/block-cross-site-dev.js`: the dev server blocks the `/_next/hmr` websocket when its `Origin` hostname is not `localhost`, the start hostname, or an `allowedDevOrigins` entry.
- `next/dist/client/dev/hot-reloader/app/web-socket.js`: after 12 failed reconnects, the client calls `window.location.reload()`.
- `next/dist/client/dev/debug-channel.js`: in dev, the debug channel for the first document comes through the same websocket, so hydration does not complete when the socket is blocked.

## Decisions
- `allowedDevOrigins` comes from the `ALLOWED_DEV_ORIGINS` env var (comma-separated hostnames). The LAN IP changes for each machine, so it is not hardcoded.
- `/search` becomes a server page that reads `searchParams.q` and passes it to the client `SearchView`.
- The form has `action="/search" method="get"` and the input has `name="q"`. A native submit before hydration goes to `/search?q=...` and keeps the query.
- A hydrated submit calls `history.replaceState` to write `?q=` and then runs the search.
- On load with `?q=`, the search runs one time.
- `search_performed` is captured with `query`, `status` (`success`, `empty`, `error`), `result_count`, and `duration_ms`.

## Security
- No token or key goes to the browser. `ALLOWED_DEV_ORIGINS` has an effect only in `next dev`.

## Acceptance Criteria
- From a LAN IP with `ALLOWED_DEV_ORIGINS` set, Search shows results and the page does not reload.
- `/search?q=react` shows the query in the input and runs the search on load.
- PostHog receives one `search_performed` event for each search.

## Checks
- `npx tsc --noEmit -p web`, `npx eslint` in `web`, `next build`.

## Manual Test
1. Set `ALLOWED_DEV_ORIGINS=<your LAN IP>` in `web/.env.local` and run `npm run dev:web`.
2. Open `http://<LAN IP>:3000/search`, sign in, and search for "data fetching".
3. Make sure that results appear and that the URL changes to `/search?q=data%20fetching`.
4. Reload the page. Make sure that the query and the results come back.
5. In PostHog, find the `search_performed` event.
