import { ArbitrageOpportunity } from "@/types/market";
import { Card } from "@/components/ui/card";
import { TrendingUp, ArrowRightLeft } from "lucide-react";

interface ArbitrageCardProps {
  opportunity: ArbitrageOpportunity;
}

export const ArbitrageCard = ({ opportunity }: ArbitrageCardProps) => {
  const profit = opportunity.profitPercent;
  const totalCost = opportunity.totalCost;

  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-primary/25 bg-card/70 p-6 shadow-[0_0_0_1px_var(--border)] backdrop-blur transition-all hover:-translate-y-0.5">
      {/* animated border & sheen */}
      <div className="animated-border" />
      <div className="shine-overlay" />

      {/* header */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold leading-snug md:text-lg">{opportunity.eventName}</h3>
        <div className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-xs font-semibold text-emerald-300">
          <TrendingUp className="h-3.5 w-3.5" />
          +{profit.toFixed(2)}%
        </div>
      </div>

      {/* legs */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <Leg
          venue="Polymarket"
          action={opportunity.polymarketAction}
          price={opportunity.polymarketPrice}
          accent="from-cyan-400/20 to-cyan-500/10"
        />
        <ArrowRightLeft className="h-5 w-5 text-muted-foreground/70" />
        <Leg
          venue="Kalshi"
          action={opportunity.kalshiAction}
          price={opportunity.kalshiPrice}
          accent="from-violet-400/20 to-violet-500/10"
        />
      </div>

      {/* stakes */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border border-primary/20 bg-background/60 p-3">
          <div className="text-muted-foreground">polymarket stake</div>
          <div className="font-mono">{opportunity.polymarketStake.toFixed(2)}</div>
        </div>
        <div className="rounded-xl border border-primary/20 bg-background/60 p-3">
          <div className="text-muted-foreground">kalshi stake</div>
          <div className="font-mono">{opportunity.kalshiStake.toFixed(2)}</div>
        </div>
      </div>

      {/* progress line */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>total cost</span>
          <span className="font-mono text-foreground/90">${totalCost.toFixed(4)}</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted/20">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400/70 to-emerald-300/70"
            style={{ width: `${Math.min(100, (1 - totalCost) * 100)}%` }}
          />
        </div>
      </div>
    </Card>
  );
};

function Leg({
  venue,
  action,
  price,
  accent,
}: {
  venue: string;
  action: string;
  price: number;
  accent: string;
}) {
  const isYes = /yes/i.test(action);
  return (
    <div className={`relative flex flex-1 items-center justify-between gap-3 overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br ${accent} p-3`}>
      <div>
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{venue}</div>
        <div className="text-sm font-semibold">
          {action} <span className="font-mono text-foreground/90">@ {price.toFixed(2)}</span>
        </div>
      </div>
      <div className={`h-8 w-8 shrink-0 rounded-full ${isYes ? "bg-emerald-400/20 ring-emerald-300/40" : "bg-rose-400/20 ring-rose-300/40"} ring-1 ring-inset backdrop-blur-sm`} />
      <div className="shine-overlay" />
    </div>
  );
}
