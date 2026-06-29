import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const authCookies: { name: string; value: string; options: any }[] = [];

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
              authCookies.push({ name, value, options });
            });
          },
        },
      },
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const serviceClient = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { autoRefreshToken: false, persistSession: false } },
      );

      const { data: existingProfile } = await serviceClient
        .from("profiles")
        .select("id")
        .eq("id", data.user.id)
        .maybeSingle();

      if (!existingProfile) {
        await serviceClient.from("profiles").upsert(
          {
            id: data.user.id,
            full_name: data.user.user_metadata?.full_name ?? data.user.email ?? "New User",
            role: data.user.user_metadata?.role ?? "staff",
            updated_at: new Date().toISOString(),
          },
          { ignoreDuplicates: true },
        );
      }

      const redirectResponse = NextResponse.redirect(new URL(next, origin));
      authCookies.forEach(({ name, value, options }) => {
        redirectResponse.cookies.set(name, value, options);
      });
      return redirectResponse;
    }
  }

  return NextResponse.redirect(new URL("/login", request.url));
}
