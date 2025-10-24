import { Market } from "@/types/market";

export const MOCK_DATA: { polymarket: Market[]; kalshi: Market[] } = {
  polymarket: [
    {
      id: "PM-1",
      event_name: "Fed Rate Hike in November",
      outcome_yes_price: 0.65,
      outcome_no_price: 0.37,
    },
    {
      id: "PM-2",
      event_name: "Bitcoin Above $100K by Dec 31",
      outcome_yes_price: 0.42,
      outcome_no_price: 0.60,
    },
    {
      id: "PM-3",
      event_name: "US Recession in 2025",
      outcome_yes_price: 0.28,
      outcome_no_price: 0.74,
    },
    {
      id: "PM-4",
      event_name: "S&P 500 Above 6000 by Year End",
      outcome_yes_price: 0.71,
      outcome_no_price: 0.31,
    },
    {
      id: "PM-5",
      event_name: "Inflation Below 2% by Q1 2025",
      outcome_yes_price: 0.33,
      outcome_no_price: 0.69,
    },
  ],
  kalshi: [
    {
      id: "K-A",
      event_name: "Fed Rate Hike in November",
      outcome_yes_price: 0.68,
      outcome_no_price: 0.30,
    },
    {
      id: "K-B",
      event_name: "Bitcoin Above $100K by Dec 31",
      outcome_yes_price: 0.55,
      outcome_no_price: 0.47,
    },
    {
      id: "K-C",
      event_name: "US Recession in 2025",
      outcome_yes_price: 0.25,
      outcome_no_price: 0.77,
    },
    {
      id: "K-D",
      event_name: "S&P 500 Above 6000 by Year End",
      outcome_yes_price: 0.69,
      outcome_no_price: 0.26,
    },
    {
      id: "K-E",
      event_name: "Inflation Below 2% by Q1 2025",
      outcome_yes_price: 0.38,
      outcome_no_price: 0.64,
    },
  ],
};

export const MATCHED_MARKETS: [string, string][] = [
  ["PM-1", "K-A"],
  ["PM-2", "K-B"],
  ["PM-3", "K-C"],
  ["PM-4", "K-D"],
  ["PM-5", "K-E"],
];
