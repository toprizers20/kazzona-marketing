// Simple in-memory cache with TTL for frequently accessed data
interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();
const DEFAULT_TTL = 60 * 1000; // 1 minute default
const MAX_CACHE_SIZE = 500; // Prevent memory leak

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  
  return entry.value;
}

export function setCache<T>(key: string, value: T, ttl: number = DEFAULT_TTL): void {
  // Evict oldest entries if at capacity
  if (cache.size >= MAX_CACHE_SIZE && !cache.has(key)) {
    const oldestKey = cache.keys().next().value;
    if (oldestKey) cache.delete(oldestKey);
  }

  cache.set(key, {
    value,
    expiresAt: Date.now() + ttl,
  });
}

export function invalidateCache(pattern: string): void {
  for (const key of cache.keys()) {
    if (key.startsWith(pattern)) {
      cache.delete(key);
    }
  }
}

// Cache keys
export const CACHE_KEYS = {
  SITE_SETTINGS: "site-settings",
  HEADER_FOOTER: "header-footer",
} as const;

// TTLs
export const CACHE_TTL = {
  SITE_SETTINGS: 5 * 60 * 1000, // 5 minutes
  HEADER_FOOTER: 5 * 60 * 1000, // 5 minutes
} as const;
