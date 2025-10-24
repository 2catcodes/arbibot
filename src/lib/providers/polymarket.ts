// Polymarket Gamma markets (read-only).
// Use proxyBase to avoid CORS (e.g., "/api" on Vercel or your Worker domain).

export interface PolyMarket {
  id: string;
  question: string;
  outcome_yes_price?: number;
  outcome_no_price?: number;
}

export async function fetchPolymarketMarkets(proxyBase?: string): Promise<PolyMarket[]> {
  const direct = "https://gamma-api.polymarket.com/markets?limit=500&offset=0&state=active";
  const url = proxyBase
    ? `${proxyBase.replace(/\/$/, "")}/polymarket/markets`
    : direct;

  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`Polymarket fetch failed: ${res.status}`);
  const data = await res.json();

  const normalized: PolyMarket[] = (data?.markets ?? []).map((m: any) => {
    const yes = Number(
      m?.prices?.yes ?? m?.bestBid?.yes ?? m?.lastPrice?.yes ?? 0
    );
    const no = Number(
      m?.prices?.no ?? m?.bestBid?.no ?? m?.lastPrice?.no ?? (yes ? 1 - yes : 0)
    );
    return {
      id: String(m?.id ?? m?.slug ?? m?.question_id ?? Math.random().toString(36).slice(2)),
      question: String(m?.question ?? m?.title ?? m?.slug ?? "Unknown"),
      outcome_yes_price: Number.isFinite(yes) ? yes : undefined,
      outcome_no_price: Number.isFinite(no) ? no : undefined,
    };
  });

  return normalized.filter(m => (m.outcome_yes_price ?? 0) > 0 || (m.outcome_no_price ?? 0) > 0);
}
