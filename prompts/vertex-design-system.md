# Vertex design system implementation prompt

## Goal
Implement the Vertex design system homepage to match the provided reference image as closely as possible, using the existing Next.js app and Tailwind styling. Recreate the reference layout, typography, spacing, colors, badges, inputs, cards, and system sections without adding unrelated product features.

## Relevant files inspected
- app/page.tsx
- app/globals.css
- app/layout.tsx
- package.json
- attachment: vertex-designsystem.png

## Decisions and assumptions
- This is a static design-system page, not a working product UI.
- The reference image is the source of truth for layout, spacing, type scale, color palette, card geometry, and general visual treatment.
- The implementation should stay within the existing Next.js app structure and use Tailwind utilities plus small custom CSS variables where needed.
- The page should be responsive while preserving the composition of the desktop reference; mobile stacking is acceptable as long as the design remains faithful.
- No additional dependencies are required unless absolutely necessary for image rendering or typography; prefer a lightweight implementation using built-in CSS and Tailwind.

## Files expected to touch
- app/page.tsx
- app/globals.css
- app/layout.tsx (only if needed to set body defaults or font/theme)

## Requirements
- Match the overall composition of the provided design system page, including:
  - header with logo and section label
  - color palette section
  - typography section
  - spacing system
  - radii/shadows section
  - icon row
  - buttons
  - inputs
  - badges / tags
  - status indicators
  - cards / navigation / principles blocks
- Use a restrained, editorial aesthetic consistent with the reference.
- Use a warm-orange accent with neutral grayscale tones and thin border lines.
- Keep the typography near the reference, especially the oversized display and section titles.
- Ensure the page feels intentional and precise rather than generic.

## Security considerations
- None beyond standard frontend rendering.
- No user data or secret handling is required for this static page.

## Acceptance criteria
- The page visually matches the supplied image closely in composition and styling.
- Sections are present and spaced like the reference.
- Buttons, badges, inputs, and cards respect the visual system in the design.
- The app builds and renders without console errors.

## Checks to run
1. Run lint: npm run lint
2. Run a production build if the route or global styling changes significantly: npm run build
3. Run the dev server and visually verify the page in the browser: npm run dev

## Exact manual test steps
1. From the project root, run npm run dev.
2. Open http://localhost:3000.
3. Compare the rendered page to the provided reference.
4. Confirm the structure, typography, color palette, and component blocks align with the design system screenshot.
5. Resize the browser to a narrower width and ensure the layout collapses cleanly without breaking structure.

## Notes
This is a visual implementation task, not a product scaffold. Keep the implementation focused on the specified design-system page and avoid broader feature work.
