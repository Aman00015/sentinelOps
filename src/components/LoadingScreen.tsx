import { useEffect, useState } from "react";
import { Shield, Scan, Globe, Lock } from "lucide-react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const scanSteps = [
  "Booting Security Core...",
  "Loading Security Modules...",
  "Scanning for Vulnerabilities...",
  "Checking Network Security...",
  "Analyzing Threat Patterns...",
  "Finalizing Security Suite..."
];

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentScan, setCurrentScan] = useState("Initializing sentinelOps...");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const introTimer = setTimeout(() => setIsVisible(true), 40);

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 3;
        const stepIndex = Math.floor(newProgress / 20);
        if (stepIndex < scanSteps.length) {
          setCurrentScan(scanSteps[stepIndex]);
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return newProgress;
      });
    }, 60);

    return () => {
      clearTimeout(introTimer);
      clearInterval(interval);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-background/90 z-50 flex items-center justify-center overflow-hidden backdrop-blur-2xl">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.20),transparent_34%),radial-gradient(circle_at_bottom,hsl(200_90%_60%/0.10),transparent_30%)]" />
      
      {/* Main loading content */}
      <div className={`relative z-10 text-center max-w-sm mx-auto px-5 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-[0.98]'}`}>
        {/* Logo */}
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-3xl flex items-center justify-center mb-4 animate-pulse-glow shadow-[0_0_40px_hsl(var(--primary)/0.22)] border border-white/10">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">sentinelOps Suite</h1>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground/90">Next-Generation Cybersecurity Platform</p>
        </div>   

        {/* Progress */}
        <div className="mb-5">
          <div className="flex justify-between text-sm text-muted-foreground mb-2 font-mono">
            <span>{currentScan}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-primary rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Security status indicators */}
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className={`p-2.5 rounded-2xl border backdrop-blur-xl transition-colors ${progress > 20 ? 'border-success/30 bg-success/10 text-success' : 'border-white/10 bg-white/[0.04] text-muted-foreground'}`}>
            <Shield className="w-4 h-4 mx-auto mb-1" />
            <div>Security Core</div>
          </div>
          <div className={`p-2.5 rounded-2xl border backdrop-blur-xl transition-colors ${progress > 40 ? 'border-success/30 bg-success/10 text-success' : 'border-white/10 bg-white/[0.04] text-muted-foreground'}`}>
            <Scan className="w-4 h-4 mx-auto mb-1" />
            <div>Threat Scanner</div>
          </div>
          <div className={`p-2.5 rounded-2xl border backdrop-blur-xl transition-colors ${progress > 60 ? 'border-success/30 bg-success/10 text-success' : 'border-white/10 bg-white/[0.04] text-muted-foreground'}`}>
            <Globe className="w-4 h-4 mx-auto mb-1" />
            <div>Network Monitor</div>
          </div>
          <div className={`p-2.5 rounded-2xl border backdrop-blur-xl transition-colors ${progress > 80 ? 'border-success/30 bg-success/10 text-success' : 'border-white/10 bg-white/[0.04] text-muted-foreground'}`}>
            <Lock className="w-4 h-4 mx-auto mb-1" />
            <div>Security Suite</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;