# Implementation Prompt: Sanity Content Model and Data Layer

## Goal
Implement the Sanity content model for Vertex (course, module, lesson, instructor, category), set up a standalone Studio workspace, and build the server-side read client (data layer) for the Next.js web workspace.

## Skills Read
- `sanity-best-practices` (workspace setup, project structure, Next.js integration)

## Code Inspected
- Root workspace (`c:\Users\mahig\Desktop\vertex`): The project is currently structured with an embedded Sanity Studio at the root level (contains `app/`, `sanity.config.ts`, etc.). 

## Decisions & Assumptions
1. **Workspace Restructuring:** Per `AGENTS.md` section 5, the project must be two standalone workspaces. Since the Next.js app is currently at the root, I will move the Next.js-specific files (`app`, `public`, `next.config.ts`, root `package.json`, etc.) into a `web/` workspace folder, and initialize a standalone Sanity Studio in a `studio/` folder. A root `package.json` will be added to manage the monorepo workspaces.
2. **Schema Design:** 
   - `course`: document type with fields matching section 8 (title, slug, marketing fields, array of `module` objects, references to instructor and category).
   - `module`: object type (embedded in course) with title, summary, and an array of lesson references.
   - `lesson`: document type (title, slug, video URL, notes (Portable Text), resources, etc.).
   - `instructor`: document type (name, slug, photo, bio, etc.).
   - `category`: document type.
   - I will use `defineType` and `defineField` for all schemas.
3. **Data Layer (Live Content API):** In the `web` workspace, I will set up `src/sanity/lib/client.ts` and `src/sanity/lib/live.ts` using `defineLive` from `next-sanity/live` (per the `sanity-best-practices` Next.js guide).
4. **Token Security:** The `SANITY_API_READ_TOKEN` will be used server-side only in `defineLive`.

## Files to Touch
- **Root:** `package.json` (new workspaces config)
- **Moves:** `app/`, `public/`, `design/`, `next.config.ts`, `package.json`, etc. -> `web/`
- **Studio:** `studio/sanity.config.ts`, `studio/sanity.cli.ts`, `studio/package.json`
- **Studio Schemas:** `studio/schemaTypes/index.ts`, `studio/schemaTypes/documents/course.ts`, `module.ts`, `lesson.ts`, `instructor.ts`, `category.ts`.
- **Web Data Layer:** `web/src/sanity/lib/client.ts`, `web/src/sanity/lib/live.ts`, `web/src/app/layout.tsx` (to add `<SanityLive />`).

## Requirements
- The schemas exactly match the definitions in `AGENTS.md` Section 8.
- The Studio must run independently of the Next.js app.
- The data layer must use the server-side Sanity client with a private token.

## Security Considerations
- Read tokens must never be exposed to the browser.
- The Next.js app accesses Sanity entirely server-side.

## Acceptance Criteria
- Running `npm run dev` in `studio` spins up the Sanity Studio on port 3333.
- Running `npm run dev` in `web` spins up Next.js on port 3000.
- The content model correctly appears in the Sanity Studio UI.
- The Next.js app is configured with `defineLive` to fetch content.

## Checks to Run
- `npm run build` in `web/`
- `npx eslint .` in `web/`
- Verify `studio/` builds and runs successfully.

## Manual Test Steps
1. Navigate to `studio/` and run `npm run dev`.
2. Open localhost:3333 and verify the schemas (Course, Lesson, Instructor, Category) are available.
3. Navigate to `web/` and run `npm run dev`.
4. Open localhost:3000 to verify the Next.js app still runs without errors after the workspace restructuring.
