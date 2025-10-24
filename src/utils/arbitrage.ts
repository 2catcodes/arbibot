import { Market, ArbitrageOpportunity } from "@/types/market";
import { MOCK_DATA, MATCHED_MARKETS } from "@/data/mockData";

export const findArbitrage = (): ArbitrageOpportunity[] => {
  const opportunities: ArbitrageOpportunity[] = [];
  const TOTAL_STAKE = 100;

  MATCHED_MARKETS.forEach(([pmId, kId]) => {
    const pmMarket = MOCK_DATA.polymarket.find((m) => m.id === pmId);
    const kMarket = MOCK_DATA.kalshi.find((m) => m.id === kId);

    if (!pmMarket || !kMarket) return;

    // Case 1: Buy YES on Polymarket, NO on Kalshi
    const costCase1 = pmMarket.outcome_yes_price + kMarket.outcome_no_price;
    if (costCase1 < 1.0) {
      const profitPercent = ((1 - costCase1) / costCase1) * 100;
      const pmStake = TOTAL_STAKE * (pmMarket.outcome_yes_price / costCase1);
      const kStake = TOTAL_STAKE * (kMarket.outcome_no_price / costCase1);

      opportunities.push({
        eventName: pmMarket.event_name,
        polymarketAction: "Buy YES",
        polymarketPrice: pmMarket.outcome_yes_price,
        kalshiAction: "Buy NO",
        kalshiPrice: kMarket.outcome_no_price,
        totalCost: costCase1,
        profitPercent,
        polymarketStake: pmStake,
        kalshiStake: kStake,
      });
    }

    // Case 2: Buy NO on Polymarket, YES on Kalshi
    const costCase2 = pmMarket.outcome_no_price + kMarket.outcome_yes_price;
    if (costCase2 < 1.0) {
      const profitPercent = ((1 - costCase2) / costCase2) * 100;
      const pmStake = TOTAL_STAKE * (pmMarket.outcome_no_price / costCase2);
      const kStake = TOTAL_STAKE * (kMarket.outcome_yes_price / costCase2);

      opportunities.push({
        eventName: pmMarket.event_name,
        polymarketAction: "Buy NO",
        polymarketPrice: pmMarket.outcome_no_price,
        kalshiAction: "Buy YES",
        kalshiPrice: kMarket.outcome_yes_price,
        totalCost: costCase2,
        profitPercent,
        polymarketStake: pmStake,
        kalshiStake: kStake,
      });
    }
  });

  return opportunities.sort((a, b) => b.profitPercent - a.profitPercent);
};
