export interface Market {
  id: string;
  event_name: string;
  outcome_yes_price: number;
  outcome_no_price: number;
}

export interface ArbitrageOpportunity {
  eventName: string;
  polymarketAction: string;
  polymarketPrice: number;
  kalshiAction: string;
  kalshiPrice: number;
  totalCost: number;
  profitPercent: number;
  polymarketStake: number;
  kalshiStake: number;
}
