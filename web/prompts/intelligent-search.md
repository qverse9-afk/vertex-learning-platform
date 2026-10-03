# Implementation Prompt: Intelligent Search

## Goal
Implement the intelligent search feature connecting the Sanity Context MCP server, a server-side search API route, and a results page UI that renders structured video and lesson result cards instead of a chatbox.

## Skills Used
- `create-agent-with-sanity-context` (MCP integration, initial-context fetching)
- Next.js App Router (API Routes, Page routing)
- `sanity-best-practices` (GROQ queries)
- Vercel AI SDK

## Code Inspected
- `c:\Users\mahig\Desktop\vertex\web\app\api` (Empty)
- `c:\Users\mahig\Desktop\vertex\web\package.json` (Needs `@ai-sdk/anthropic`, `@ai-sdk/mcp`, `@ai-sdk/react`, `ai`)
- `c:\Users\mahig\Desktop\vertex\studio\schemaTypes\lesson.ts` & `course.ts` (For schema understanding)
- `AGENTS.md` (Rules for search behavior)

## Decisions & Assumptions
1. **Dependencies**: We will install the Vercel AI SDK packages (`@ai-sdk/anthropic`, `@ai-sdk/mcp`, `@ai-sdk/react`, `ai`) in the `web` workspace.
2. **Search API**: We will create `app/api/search/route.ts`. It will connect to the Sanity Context MCP server using HTTP transport and the `SANITY_API_TOKEN`. It will fetch the initial context and inject it into the system prompt. It will use the `claude-3-5-sonnet-latest` (or user's preferred) model via the Anthropic provider.
3. **Structured Output**: Since the UI must be a results page with cards (not a chatbox), we will instruct the LLM in the system prompt to output ONLY a JSON array of results after calling the `groq_query` tool. Or, even better, we will use `streamObject` or `generateObject` with a strict Zod schema for the final result (containing `type: 'lesson' | 'video'`, `title`, `description`, `course`, `moduleLabel`, `timestamp`, `slug`, etc.). 
4. **GROQ Strategy**: The system prompt will instruct the LLM to write GROQ queries that match both lesson topics (title, notes) and video moments (chapters, transcripts) and return a unified ranked list. We will explicitly instruct it *never* to return full transcript arrays, but to filter them in GROQ (e.g., `chunks[text match "*keyword*"]`).
5. **Context Document**: We will assume a Context document with slug `default` exists or will be created (or use the base MCP URL without a slug). We will use environment variables for `SANITY_CONTEXT_MCP_URL`.
6. **UI Component**: We will create `app/search/page.tsx` as a Client Component that uses `useChat` or `useCompletion` or standard `fetch` to call the `/api/search` route and render the results as cards.

## Files to Touch
- `c:\Users\mahig\Desktop\vertex\web\package.json` (Install AI SDK)
- `c:\Users\mahig\Desktop\vertex\web\.env.local` (Add necessary variables if missing, though we won't commit this, we will document them)
- `c:\Users\mahig\Desktop\vertex\web\app\api\search\route.ts` (New API route)
- `c:\Users\mahig\Desktop\vertex\web\app\search\page.tsx` (Search results page UI)
- `c:\Users\mahig\Desktop\vertex\web\components\search\ResultCard.tsx` (Component for rendering a single result card)

## Requirements
- The search API must connect to the Sanity Context MCP server.
- The LLM must be strictly instructed to surface results based on data, and never invent courses/lessons/timestamps.
- The UI must render structured cards, not a conversational chatbox.
- Result cards must link to the correct lesson page, and video results must append the `?start=X` parameter.
- The search must handle both lesson-level and video-moment-level results.

## Security Considerations
- The `SANITY_API_TOKEN` must remain on the server and never be exposed to the client.
- We will fetch the schema context server-side.

## Acceptance Criteria
- A user can enter a query in the search page.
- The system processes the query, calls the MCP tool to query Sanity, and returns structured data.
- The UI displays the results as clickable cards with appropriate metadata.

## Test Steps
1. Install dependencies.
2. Add necessary `.env.local` variables (`SANITY_CONTEXT_MCP_URL`, `SANITY_API_TOKEN`, `ANTHROPIC_API_KEY`).
3. Start the dev server.
4. Navigate to `/search` and submit a query (e.g., "pandas").
5. Verify that result cards appear and link correctly to the lesson pages.
