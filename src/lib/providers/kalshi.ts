// Public Kalshi market data (read-only).
// If you deploy a proxy, pass its base (e.g., "/api" or "https://your-worker")
// and we’ll call `${proxyBase}/kalshi/markets?...` instead.

export interface KalshiMarket {
  ticker: string;
  title: string;
  yes_price?: number;
  no_price?: number;
}

export async function fetchKalshiMarkets(proxyBase?: string): Promise<KalshiMarket[]> {
  const direct =
    "https://api.elections.kalshi.com/trade-api/v2/markets?status=open&limit=1000";
  const url = proxyBase
    ? `${proxyBase.replace(/\/$/, "")}/kalshi/markets?status=open&limit=1000`
    : direct;

  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`Kalshi fetch failed: ${res.status}`);
  const data = await res.json();

  const normalized: KalshiMarket[] = (data?.markets ?? []).map((m: any) => {
    const yes = Number(m?.yes_price ?? m?.last_price_yes ?? 0);
    const no = Number(m?.no_price ?? (yes ? 1 - yes : 0));
    return {
      ticker: String(m?.ticker ?? m?.id ?? ""),
      title: String(m?.title ?? m?.name ?? m?.ticker ?? "Unknown"),
      yes_price: Number.isFinite(yes) ? yes : undefined,
      no_price: Number.isFinite(no) ? no : undefined,
    };
  });

  return normalized.filter(m => (m.yes_price ?? 0) > 0 || (m.no_price ?? 0) > 0);
}
