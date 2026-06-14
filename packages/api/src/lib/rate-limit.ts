const buckets = new Map<string, number[]>();

export function isRateLimited(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const bucket = buckets.get(key)?.filter((timestamp) => now - timestamp < windowMs) ?? [];

  if (bucket.length >= limit) {
    buckets.set(key, bucket);
    return true;
  }

  bucket.push(now);
  buckets.set(key, bucket);
  return false;
}
