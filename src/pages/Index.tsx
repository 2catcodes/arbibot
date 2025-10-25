import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArbitrageCard } from "@/components/ArbitrageCard";
import { findArbitrageLive } from "@/utils/arbitrage";
import { ArbitrageOpportunity } from "@/types/market";
import { Activity, Search } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    setIsScanning(true);
    toast.info("scanning live markets…");
    try {
      const proxy = import.meta.env.VITE_PROXY_BASE;
      const data = await findArbitrageLive(proxy);
      setOpportunities(data);
      if (!data.length) toast.message("no spreads yet", { description: "try again in a bit." });
      else toast.success(`found ${data.length} spread${data.length > 1 ? "s" : ""}`);
    } catch (err: any) {
      toast.error(`scan failed: ${err?.message || "Failed to fetch"}`);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* background layers */}
      <div className="fixed inset-0 -z-10">
        <div className="aurora layer-a" />
        <div className="aurora layer-b" />
        <div className="aurora layer-c" />
        <div className="grain" />
        <div className="glow-bottom" />
        <ul className="particles">
          {Array.from({ length: 28 }).map((_, i) => (
            <li key={i} style={{ ["--d" as any]: `${i * 0.15}s`, ["--x" as any]: `${(i * 37) % 100}%` }} />
          ))}
        </ul>
      </div>

      {/* header / hero */}
      <header className="relative">
        <div className="container mx-auto px-4 pt-14">
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            {/* Title only */}
            <h1 className="text-balance bg-[radial-gradient(80%_80%_at_50%_0%,hsl(var(--primary))_0%,hsl(var(--primary)/.6)_60%,hsl(var(--primary)/.2)_100%)] bg-clip-text text-5xl font-black leading-[1.05] text-transparent drop-shadow-sm md:text-8xl">
              ArbFarm
            </h1>

            {/* action row */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                onClick={handleScan}
                disabled={isScanning}
                className="neon-cta group relative h-12 rounded-2xl px-7 text-base font-semibold"
              >
                <span className="ring-layers" />
                {isScanning ? (
                  <span className="flex items-center gap-2">
                    <Activity className="h-4 w-4 animate-scan" />
                    scanning…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Scan
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* results */}
      <main className="relative">
        <div className="container mx-auto px-4 py-10 md:py-16">
          {opportunities.length === 0 ? (
            <Empty />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {opportunities.map((opp, i) => (
                <div
                  key={`${opp.eventName}-${i}`}
                  className="animate-in fade-in slide-in-from-bottom-3 duration-700"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <ArbitrageCard opportunity={opp} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

function Empty() {
  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-primary/20 bg-card/60 p-8 text-center backdrop-blur">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
        <Search className="h-5 w-5 text-primary" />
      </div>
      <h2 className="mb-2 text-xl font-semibold">no results yet</h2>
      <p className="mx-auto max-w-lg text-sm text-muted-foreground">
        tap <span className="font-medium text-foreground/90">scan markets</span> to pull fresh prices and find potential spreads.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Skeleton />
        <Skeleton delay="140ms" />
      </div>
    </div>
  );
}

function Skeleton({ delay = "0ms" }: { delay?: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-muted/20 bg-gradient-to-b from-background to-card p-5"
      style={{ animationDelay: delay }}
    >
      <div className="mb-4 h-4 w-4/5 animate-pulse rounded bg-muted/40" />
      <div className="mb-2 h-3 w-2/3 animate-pulse rounded bg-muted/30" />
      <div className="mb-6 h-3 w-1/2 animate-pulse rounded bg-muted/30" />
      <div className="flex items-center gap-3">
        <div className="h-8 w-24 animate-pulse rounded-full bg-muted/40" />
        <div className="h-8 w-20 animate-pulse rounded-full bg-muted/30" />
      </div>
      <div className="shine-overlay" />
    </div>
  );
}

export default Index;
