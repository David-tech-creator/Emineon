import { llmsTxt } from "@/lib/llms";

/** /llms.txt (llmstxt.org): a short, authoritative map of the site for language models. */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
