const stores = new Map<string, { count: number; resetAt: number }>();

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of stores) {
    if (entry.resetAt < now) stores.delete(key);
  }
}, 60_000);

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number = 60_000,
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = stores.get(key);

  if (!entry || entry.resetAt < now) {
    stores.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count };
}
