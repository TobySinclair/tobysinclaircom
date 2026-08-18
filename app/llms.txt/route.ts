import { buildLlmsTxt, markdownHeaders } from "@/lib/llms";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), { headers: markdownHeaders() });
}
