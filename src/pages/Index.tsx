import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArbitrageCard } from "@/components/ArbitrageCard";
import { findArbitrage } from "@/utils/arbitrage";
import { ArbitrageOpportunity } from "@/types/market";
import { Activity, Search, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    toast.info("Scanning markets for arbitrage opportunities...");
    
    setTimeout(() => {
      const results = findArbitrage();
      setOpportunities(results);
      setIsScanning(false);
      
      if (results.length > 0) {
        toast.success(`Found ${results.length} arbitrage opportunity${results.length > 1 ? 'ies' : ''}!`);
      } else {
        toast.warning("No arbitrage opportunities found at this time.");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-primary/30 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-primary text-glow-cyan" />
            <div>
              <h1 className="text-3xl font-bold text-primary text-glow-cyan">
                The Arbibot
              </h1>
              <p className="text-sm text-muted-foreground">
                Prediction Market Arbitrage Finder
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Scanner Section */}
        <div className="mb-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-4 py-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-success"></div>
            <span className="font-mono-data text-sm text-foreground/80">
              Markets: Polymarket × Kalshi
            </span>
          </div>

          <Button
            onClick={handleScan}
            disabled={isScanning}
            size="lg"
            className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan"
          >
            <Search className={`mr-2 h-5 w-5 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? 'Scanning Markets...' : 'Scan for Opportunities'}
          </Button>

          {opportunities.length > 0 && (
            <p className="mt-4 font-mono-data text-sm text-muted-foreground">
              Displaying {opportunities.length} profitable arbitrage opportunity{opportunities.length > 1 ? 'ies' : ''}
            </p>
          )}
        </div>

        {/* Results */}
        {opportunities.length > 0 ? (
          <div className="grid gap-6">
            {opportunities.map((opportunity, index) => (
              <ArbitrageCard key={index} opportunity={opportunity} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <AlertCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <p className="text-lg text-muted-foreground">
                Click "Scan for Opportunities" to begin
              </p>
              <p className="mt-2 text-sm text-muted-foreground/70">
                The bot will analyze prediction markets and find profitable arbitrage trades
              </p>
            </div>
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-12 rounded-lg border border-primary/20 bg-card/30 p-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            How It Works
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              • The Arbibot scans Polymarket and Kalshi for matching prediction markets
            </p>
            <p>
              • It identifies price discrepancies where you can profit risk-free
            </p>
            <p>
              • Arbitrage exists when buying opposite outcomes on both platforms costs less than $1.00
            </p>
            <p>
              • The bot calculates optimal stake allocation to maximize returns
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
