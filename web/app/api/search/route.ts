import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createMCPClient } from '@ai-sdk/mcp';

async function fetchInitialContext(mcpUrl: string, token: string) {
  try {
    const url = new URL(mcpUrl);
    url.pathname = `${url.pathname}/initial-context`.replace('//', '/');
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return '';
    const data = await res.json();
    return data.context || '';
  } catch (err: unknown) {
    console.error("Error fetching initial context:", err);
    return '';
  }
}

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const mcpUrl = process.env.SANITY_CONTEXT_MCP_URL;
    const sanityToken = process.env.SANITY_API_READ_TOKEN;

    if (!mcpUrl || !sanityToken) {
      throw new Error("Missing Sanity Context MCP configuration");
    }

    const [mcpClient, initialContext] = await Promise.all([
      createMCPClient({
        transport: {
          type: 'http',
          url: mcpUrl,
          headers: {
            Authorization: `Bearer ${sanityToken}`,
          },
        },
      }),
      fetchInitialContext(mcpUrl, sanityToken)
    ]);

    const allMcpTools = await mcpClient.tools();
    const mcpTools = { ...allMcpTools };
    delete mcpTools.initial_context;

    const systemPrompt = `
You are an intelligent search agent for a learning platform called Vertex. 
Your goal is to find relevant lessons and video moments for the user's query.

Here is the schema context:
${initialContext}

When searching for the user query, use the \`groq_query\` tool to query the Sanity dataset.
Search both ways and merge: match lessons on their topic (title and notes) and match video moments (chapters first, then transcript chunks).
Rank by specificity (e.g. a title that contains the exact concept beats a broad keyword hit).
Wildcard your keywords and OR multiple words. You cannot text match a Portable Text field directly, so match its plain text projection.
Never return a whole transcript or chunks array in the final output.

Once you have executed the necessary queries and retrieved the data, you MUST return a final response strictly as a JSON array of result objects. Do not include any conversational text outside the JSON array.
Each result object should have the following shape:
{
  "type": "lesson" | "video",
  "title": "Title of the lesson or video clip",
  "description": "Short description or matched text",
  "courseTitle": "Name of the parent course",
  "courseSlug": "Slug of the parent course",
  "lessonSlug": "Slug of the lesson",
  "moduleLabel": "Module X: Title",
  "timestamp": 120, // (only for video results)
  "duration": 60, // length of clip or lesson
  "imageUrl": "Thumbnail or poster URL"
}

Return ONLY valid JSON (without markdown formatting blocks if possible, or strictly just the JSON array).
`;

    const result = await generateText({
      model: openai('gpt-4o'),
      system: systemPrompt,
      prompt: `Search query: ${query}`,
      tools: mcpTools,
      maxSteps: 5,
    });

    let results = [];
    try {
      // LLM might wrap in ```json ... ```
      let jsonText = result.text.trim();
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.substring(7, jsonText.length - 3).trim();
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.substring(3, jsonText.length - 3).trim();
      }
      results = JSON.parse(jsonText);
    } catch (err) {
      console.error("Failed to parse LLM JSON output:", result.text, err);
      results = [];
    }

    return NextResponse.json({ results });

  } catch (error: unknown) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
