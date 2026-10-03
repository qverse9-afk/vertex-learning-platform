# Implementation Prompt: Lesson Page

## Goal
Implement the lesson page (`/courses/[courseSlug]/lessons/[lessonSlug]`) wired to seeded Sanity content, with the lesson video playing, matching the provided UI design.

## Skills Used
- Next.js App Router conventions
- `sanity-best-practices` (GROQ queries, Portable Text rendering)
- Tailwind CSS

## Code Inspected
- `c:\Users\mahig\Desktop\vertex\studio\schemaTypes\lesson.ts` (Lesson schema)
- `c:\Users\mahig\Desktop\vertex\studio\schemaTypes\course.ts` (Course schema)
- `c:\Users\mahig\Desktop\vertex\web\app\courses\[slug]\page.tsx` (Course page pattern)
- `c:\Users\mahig\Desktop\vertex\web\components\course\CourseContent.tsx` (Existing course content listing)
- `c:\Users\mahig\Desktop\vertex\web\sanity\lib\queries.ts` (Existing queries)

## Decisions & Assumptions
1. **Route Structure**: We will use `app/courses/[courseSlug]/lessons/[lessonSlug]/page.tsx` as the route. This provides a clear hierarchy and allows us to easily use the `courseSlug` for breadcrumbs or reverse lookups if needed.
2. **Data Fetching**: We will add a new GROQ query `lessonBySlugQuery` in `queries.ts` to fetch the lesson by its slug, and also do a reverse reference lookup `*[_type == "course" && references(^._id)][0]` to get the parent course details (like title, modules, and other lessons) so we can populate the sidebar and breadcrumbs.
3. **Video Playback**: The video URL is provided by the Sanity schema (`videoUrl`). We will implement a video player embed (YouTube, Vimeo, or Bunny). We will parse the URL and handle the `start` query parameter if passed via URL `?start=120`, passing it to the provider's embed.
4. **Layout**:
    - **Main Content**: Video player at the top. Below the video, a tabbed interface (or stacked depending on UI) for "Notes", "Key Points", "Pro Tip", and "Resources". Portable text will be rendered using `@portabletext/react`.
    - **Sidebar**: A collapsible course module listing showing all lessons in the course, highlighting the currently active lesson.
5. **Component Updates**: Update `CourseContent.tsx` to wrap lesson titles in `<Link>` tags pointing to their respective lesson pages.
6. **Analytics**: Fire a `lesson_viewed` event using PostHog when the page loads, similar to the course page.

## Files to Touch
- `c:\Users\mahig\Desktop\vertex\web\sanity\lib\queries.ts` (Add `lessonBySlugQuery`)
- `c:\Users\mahig\Desktop\vertex\web\app\courses\[courseSlug]\lessons\[lessonSlug]\page.tsx` (New page component)
- `c:\Users\mahig\Desktop\vertex\web\components\course\CourseContent.tsx` (Update to add Links)
- `c:\Users\mahig\Desktop\vertex\web\components\lesson\VideoPlayer.tsx` (New component for the video embed)
- `c:\Users\mahig\Desktop\vertex\web\components\lesson\LessonSidebar.tsx` (New component for the sidebar)

## Requirements
- Match the exact layout, typography, and spacing of the provided `vertex-lesson.png`.
- The video must play on the page using a provider embed, honoring a `start` query param.
- Page must be responsive (stack columns and collapse sidebar on mobile).
- Ground all data in Sanity: no hardcoded text.

## Security Considerations
- Read-only data fetched server-side using the `sanityFetch` helper.
- Clerk auth is not enforced here yet (it's public unless marked protected later).

## Acceptance Criteria
- User can navigate from a course page to a lesson page.
- Lesson page displays the video, notes (rendered Portable Text), resources, and key points.
- The sidebar accurately reflects the course structure and highlights the current lesson.
- Video starts at the designated timestamp if `?start=X` is provided.

## Test Steps
1. Open the dev server: `npm run dev`.
2. Go to a course page, e.g., `/courses/nextjs-from-scratch`.
3. Click on a lesson in the course content section.
4. Verify the lesson page loads with the correct video and content.
5. Verify the URL `?start=30` successfully starts the video at 30 seconds.
