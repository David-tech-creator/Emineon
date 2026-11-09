import { llmsFullTxt } from "@/lib/llms";

/** /llms-full.txt: every fact, service, industry, engagement, FAQ and governance summary in one file. */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFullTxt("en"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
