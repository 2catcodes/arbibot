import { ArbitrageOpportunity } from "@/types/market";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface ArbitrageCardProps {
  opportunity: ArbitrageOpportunity;
}

export const ArbitrageCard = ({ opportunity }: ArbitrageCardProps) => {
  return (
    <Card className="border-2 border-primary/30 bg-card glow-cyan p-6 transition-all hover:border-primary/50 hover:glow-cyan">
      <div className="space-y-4">
        {/* Event Name */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold text-foreground">
            {opportunity.eventName}
          </h3>
          <div className="flex items-center gap-2 rounded-lg bg-success/20 px-3 py-1.5 glow-green">
            <TrendingUp className="h-5 w-5 text-success" />
            <span className="font-mono-data text-lg font-bold text-success text-glow-green">
              +{opportunity.profitPercent.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Actions Grid */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-primary/40 bg-secondary/50 p-4">
            <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
              Polymarket
            </div>
            <div className="font-mono-data text-lg font-semibold text-primary text-glow-cyan">
              {opportunity.polymarketAction}
            </div>
            <div className="font-mono-data text-sm text-foreground/80">
              @ ${opportunity.polymarketPrice.toFixed(2)}
            </div>
          </div>

          <div className="rounded-lg border border-primary/40 bg-secondary/50 p-4">
            <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
              Kalshi
            </div>
            <div className="font-mono-data text-lg font-semibold text-primary text-glow-cyan">
              {opportunity.kalshiAction}
            </div>
            <div className="font-mono-data text-sm text-foreground/80">
              @ ${opportunity.kalshiPrice.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Stake Allocation */}
        <div className="rounded-lg border border-success/30 bg-success/5 p-4">
          <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
            Optimal Stake Allocation ($100 Total)
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="font-mono-data text-sm text-foreground/80">Polymarket: </span>
              <span className="font-mono-data font-semibold text-success">
                ${opportunity.polymarketStake.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="font-mono-data text-sm text-foreground/80">Kalshi: </span>
              <span className="font-mono-data font-semibold text-success">
                ${opportunity.kalshiStake.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="mt-2 border-t border-success/20 pt-2">
            <span className="font-mono-data text-xs text-muted-foreground">Total Cost: </span>
            <span className="font-mono-data text-sm text-foreground/90">
              ${opportunity.totalCost.toFixed(4)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
