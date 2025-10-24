// Lightweight title matcher to pair Polymarket vs Kalshi events.

export function normalizeTitle(t: string): string {
  return t.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenSet(str: string): Set<string> {
  return new Set(normalizeTitle(str).split(" ").filter(Boolean));
}

export function jaccard(a: string, b: string): number {
  const A = tokenSet(a);
  const B = tokenSet(b);
  const inter = new Set([...A].filter(x => B.has(x))).size;
  const union = new Set([...A, ...B]).size || 1;
  return inter / union;
}

export function looksLikeSameEvent(a: string, b: string): boolean {
  // Tweak threshold if you want looser/tighter pairing.
  return jaccard(a, b) >= 0.45;
}
