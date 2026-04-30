import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 transition-all duration-300 ${
      scrolled ? 'drop-shadow-[0_30px_80px_hsl(229_84%_3%/0.45)]' : 'drop-shadow-[0_20px_60px_hsl(229_84%_3%/0.28)]'
    }`}>
      <div className="glass-nav mx-auto max-w-7xl rounded-full px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
        
            <div className="leading-none">
              <span className="block font-display text-sm tracking-[0.28em] text-transparent bg-gradient-to-r from-white via-white to-primary/80 bg-clip-text">
                sentinelOps
              </span>
              <span className="mt-1 block font-mono text-[10px] tracking-[0.22em] text-white/55">
                CYBERSECURITY PLATFORM
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
            <a href="#solutions" className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/[0.08] hover:text-foreground">
              Solutions
            </a>
            <a href="#tools" className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/[0.08] hover:text-foreground">
              Security Tools
            </a>
            <a href="#features" className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/[0.08] hover:text-foreground">
              Features
            </a>
            <a href="#about" className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/[0.08] hover:text-foreground">
              About
            </a>
            <a href="#contact" className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/[0.08] hover:text-foreground">
              Contact
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" size="sm" className="rounded-full">
              Sign In
            </Button>
            <Button variant="demo" size="sm" className="rounded-full">
              Get Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-foreground backdrop-blur-xl transition-colors hover:bg-white/10 hover:text-primary"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-2xl">
            <div className="flex flex-col gap-2">
              <a
                href="#solutions"
                className="rounded-2xl px-4 py-3 text-muted-foreground transition-colors hover:bg-white/[0.08] hover:text-foreground"
                onClick={toggleMenu}
              >
                Solutions
              </a>
              <a
                href="#tools"
                className="rounded-2xl px-4 py-3 text-muted-foreground transition-colors hover:bg-white/[0.08] hover:text-foreground"
                onClick={toggleMenu}
              >
                Security Tools
              </a>
              <a
                href="#features"
                className="rounded-2xl px-4 py-3 text-muted-foreground transition-colors hover:bg-white/[0.08] hover:text-foreground"
                onClick={toggleMenu}
              >
                Features
              </a>
              <a
                href="#about"
                className="rounded-2xl px-4 py-3 text-muted-foreground transition-colors hover:bg-white/[0.08] hover:text-foreground"
                onClick={toggleMenu}
              >
                About
              </a>
              <a
                href="#contact"
                className="rounded-2xl px-4 py-3 text-muted-foreground transition-colors hover:bg-white/[0.08] hover:text-foreground"
                onClick={toggleMenu}
              >
                Contact
              </a>
              <div className="flex flex-col gap-2 pt-3">
                <Button variant="outline" size="sm" className="rounded-full" onClick={toggleMenu}>
                  Sign In
                </Button>
                <Button variant="demo" size="sm" className="rounded-full" onClick={toggleMenu}>
                  Get Demo
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;