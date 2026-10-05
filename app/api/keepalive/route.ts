// app/api/keepalive/route.ts

export const dynamic = "force-dynamic";

export async function GET() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/products?select=id&limit=1`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      },
      cache: "no-store",
    }
  );

  return Response.json({
    status: res.status,
    time: new Date().toISOString(),
  });
}