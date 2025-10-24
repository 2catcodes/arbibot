// Uses live public data (no keys) to compute opportunities.
// If you deploy a proxy, pass `VITE_PROXY_BASE` in your env.

import type { ArbitrageOpportunity } from "../types/market";
import { fetchPolymarketMarkets } from "../lib/providers/polymarket";
import { fetchKalshiMarkets } from "../lib/providers/kalshi";
import { looksLikeSameEvent } from "../lib/match";

export async function findArbitrageLive(
  proxyBase?: string
): Promise<ArbitrageOpportunity[]> {
  const [pm, ks] = await Promise.all([
    fetchPolymarketMarkets(proxyBase),
    fetchKalshiMarkets(proxyBase),
  ]);

  const opportunities: ArbitrageOpportunity[] = [];
  const TOTAL_STAKE = 100;

  for (const p of pm) {
    const match = ks.find(k => looksLikeSameEvent(p.question, k.title));
    if (!match) continue;

    const pmYes = Number(p.outcome_yes_price ?? 0);
    const pmNo = Number(p.outcome_no_price ?? (pmYes ? 1 - pmYes : 0));
    const kYes = Number(match.yes_price ?? 0);
    const kNo = Number(match.no_price ?? (kYes ? 1 - kYes : 0));

    // Case 1: YES on Polymarket, NO on Kalshi
    const cost1 = pmYes + kNo;
    if (cost1 > 0 && cost1 < 1.0) {
      const pmStake = (pmYes / (pmYes + kNo)) * TOTAL_STAKE;
      const kStake = TOTAL_STAKE - pmStake;
      const profitPercent = (1 - cost1) * 100;
      opportunities.push({
        eventName: p.question,
        polymarketAction: "Buy YES",
        polymarketPrice: pmYes,
        kalshiAction: "Buy NO",
        kalshiPrice: kNo,
        totalCost: cost1,
        profitPercent,
        polymarketStake: pmStake,
        kalshiStake: kStake,
      });
    }

    // Case 2: NO on Polymarket, YES on Kalshi
    const cost2 = pmNo + kYes;
    if (cost2 > 0 && cost2 < 1.0) {
      const pmStake = (pmNo / (pmNo + kYes)) * TOTAL_STAKE;
      const kStake = TOTAL_STAKE - pmStake;
      const profitPercent = (1 - cost2) * 100;
      opportunities.push({
        eventName: p.question,
        polymarketAction: "Buy NO",
        polymarketPrice: pmNo,
        kalshiAction: "Buy YES",
        kalshiPrice: kYes,
        totalCost: cost2,
        profitPercent,
        polymarketStake: pmStake,
        kalshiStake: kStake,
      });
    }
  }

  opportunities.sort((a, b) => b.profitPercent - a.profitPercent);
  return opportunities;
}
