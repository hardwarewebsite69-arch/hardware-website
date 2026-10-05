import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const publicPaths = [
  "/",
  "/shop",
  "/quote",
  "/contact",
  "/search",
  "/terms",
  "/privacy",
  "/dispatch-policy",
  "/login",
  "/forgot-password",
  "/update-password",
  "/auth/callback",
  "/api/keepalive",
  "/api/uploadthing",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.json",
];

function isPublicPath(pathname: string): boolean {
  if (pathname.startsWith("/_next") || pathname.startsWith("/static")) return true;
  if (pathname.startsWith("/product/") || pathname.startsWith("/shop/")) return true;
  if (pathname.startsWith("/quote/")) return true;
  if (publicPaths.includes(pathname)) return true;
  return false;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  try {
    let response = NextResponse.next({
      request: { headers: request.headers },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    return response;
  } catch {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
