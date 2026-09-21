# Implementation Prompt: Home Page UI

## Goal
Implement the home page UI based exactly on the provided design reference (`design/vertex-home.png`). The current `app/page.tsx` contains some boilerplate, but it needs to be updated to match the design's layout, spacing, typography, colors, and specific SVG icons (such as Next.js, Docker, and TypeScript badges, as well as the bottom gradient bar chart).

## Inspected Code
- `app/page.tsx`: Contains the current implementation which loosely resembles the structure but lacks the exact details, icons, and layout precision.
- `app/globals.css`: Contains the base styles, CSS variables, and `.page-shell` background which matches the design's diagonal striped background.

## Decisions & Assumptions
- **Icons & Badges**: I will replace the text/emoji placeholders for the Next.js, Docker, and TypeScript courses with exact or highly accurate SVG representations of their respective logos to match the design.
- **Avatar**: The design shows a user's face instead of a monogram. I will use a placeholder image (e.g., via a generic UI faces URL) or a well-styled fallback that closely mimics the design's avatar.
- **Bottom Graphic**: The current implementation has thin vertical bars. I will replace it with an overlapping series of wide, semi-transparent rectangles (or a custom SVG path) that creates the "skyline" effect seen at the bottom of the design.
- **Typography & Colors**: I will carefully align text sizes, font weights, and spacing with Tailwind classes. I will use the `.font-display` utility class (which maps to a serif font stack in `globals.css`) for the main heading and "All Courses" heading, as well as the course card titles.
- **Responsiveness**: The design is desktop-only, so I will ensure the layout stacks gracefully on mobile (e.g., hiding navigation links on small screens, stacking the course grid to 1 column on mobile, 2 on tablet, and 3 on desktop).

## Files to Touch
- `app/page.tsx`: Main page layout and component changes.

## Requirements
- The page must be a pixel-perfect (or as close as possible with Tailwind) reproduction of the desktop design.
- Layout, spacing, typography, colors, and states (like hover) must be meticulously reproduced.
- Use existing components and Tailwind patterns.

## Security Considerations
- There are no new security considerations since this is purely a presentational component without dynamic data access or user input processing.

## Acceptance Criteria
- The page renders correctly without errors.
- The visual output exactly matches the provided design image for desktop resolutions.
- The page gracefully responds to smaller screens.
- All interactive elements (buttons, links) have appropriate hover states.

## Checks to Run
- Type check (`npm run typecheck` or equivalent TS check).
- Linting.
- Next.js build.
- Run the dev server to visually compare with the design.

## Exact Manual Test Steps
1. Run `npm run dev` from the `web` workspace (or root).
2. Open `http://localhost:3000` in a browser.
3. Compare the header, hero section, search bar, courses grid, and footer graphic with the `design/vertex-home.png` file.
4. Resize the window to ensure the grid collapses and the layout remains readable on mobile widths.
