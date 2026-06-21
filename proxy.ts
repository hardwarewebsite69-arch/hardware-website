import { middleware as supabaseMiddleware } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  return await supabaseMiddleware(request);
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
