# Course Page Implementation Prompt

## Goal
Implement the Course Details page (`web/app/courses/[slug]/page.tsx`) matching the provided design `vertex-course.png` precisely, using Next.js App Router, Tailwind CSS, and fetching data from Sanity through the server side data layer.

## Skills & Reference
- Follow rules in `AGENTS.md` (Next.js server/client boundaries, fetch server-side from Sanity using a token, Clerk auth integration, etc.).
- UI must match `vertex-course.png` exactly in layout, typography, colors, and responsive behavior (desktop exact, responsive mobile).

## Code Inspected
- `studio/schemaTypes/course.ts`, `module.ts`, `lesson.ts` schemas.
- `web/sanity/lib/` setup files.

## Decisions and Assumptions
- Use `lucide-react` for icons if needed (e.g. for outcomes, chevron, stats icons).
- Course stats (duration, modules count) are computed from the fetched `modules` and their `lessons`. Total course duration is the sum of all lesson durations.
- "What you'll learn" will map `course.learningOutcomes`.
- "Course Content" will map `course.modules` and sum lesson duration per module to show the module's total time.
- "Your Progress" bar will default to static/mock 35% for now if progress API is not yet available, since the design includes it. We will build the UI for it as a separate Client Component that can later take actual progress state.
- Buttons ("Continue Learning", "Bookmark") will be client components.
- The UI contains premium aesthetics (glassmorphism/gradients at bottom, specific font choices and colors like orange/rust for primary actions). We will implement exact Tailwind utility classes to reproduce the design.

## Files to Touch
- `web/app/courses/[slug]/page.tsx` (Server Component, fetching data)
- `web/sanity/lib/queries.ts` (Add GROQ query to fetch a single course with modules and lessons)
- `web/components/course/*` (Client components for interactivity like accordions, progress bar)

## Requirements
- The page must be rendered on the server (Server Component) fetching the Sanity data directly.
- Ensure the route parameters resolve the `[slug]`.
- Create a reusable `SanityImage` component or use `next-sanity` helpers to render the cover image.
- Render all fields specified in the design, including 'POPULAR' tag conditionally based on `isPopular`.
- Implement Accordion for the module list.

## Security Considerations
- The query to fetch course data must use the appropriate server-side Sanity client.
- No write operations are involved in this read-only view.

## Acceptance Criteria
- UI precisely matches `vertex-course.png`.
- Route `/courses/[slug]` loads real course data from Sanity.
- Expandable Course Content accordion works.

## Checks to Run
- `npm run dev` in `web` workspace.
- Browse to `/courses/[slug]` to verify visual match and hydration.

## Manual Test Steps
1. In Sanity Studio, create a sample course with modules and lessons matching the Next.js course text, including cover image, outcomes, etc.
2. Open `localhost:3000/courses/<slug>`.
3. Verify the layout, font, spacing, and styling matches the reference image exactly.
4. Expand/collapse modules to test interaction.
