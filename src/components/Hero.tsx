import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Scan, Globe, AlertTriangle, FileX } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-32">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/hero-bg.mp4" // 👉 place your video file in the public/videos folder
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.18),transparent_40%),radial-gradient(circle_at_bottom_right,hsl(200_90%_60%/0.12),transparent_30%)]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-chip rounded-full px-4 py-2 mb-8">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground font-mono tracking-wide">
              Automate Your Security Checks
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 leading-[0.95] tracking-tight">
            Always Ready To
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Secure
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Modern cyber threats require modern solutions. sentinelOps Suite integrates essential cybersecurity tools into one powerful platform.
          </p>


          {/* Security Tools Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="glass-card rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1">
              <Scan className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-muted-foreground">Vulnerability Scanner</p>
            </div>
            <div className="glass-card rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1">
              <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-muted-foreground">Subdomain Finder</p>
            </div>
            <div className="glass-card rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1">
              <AlertTriangle className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-muted-foreground">Phishing Detector</p>
            </div>
            <div className="glass-card rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1">
              <FileX className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-muted-foreground">Malware Scanner</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
