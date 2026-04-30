import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Scan, 
  Globe, 
  AlertTriangle, 
  FileX, 
  ArrowRight, 
  Github,
  Search,
  Shield,
  Zap
} from "lucide-react";
// import Link from "next/link";
import VulnerabilityScannerPage from "@/pages/tools/vulnerability-scanner";
import { Link } from "react-router-dom";
const SecurityTools = () => {
  const tools = [
    {
      icon: <Scan className="h-8 w-8 text-primary" />,
      title: "Vulnerability Scanner",
      description: "Scan GitHub repositories for security vulnerabilities and get detailed CVE analysis with patch recommendations.",
      features: ["GitHub Integration", "CVE Database", "Patch Analysis", "Automated Reports"],
      status: "Ready",
      href: "/tools/vulnerability-scanner",
      color: "success"
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Subdomain Finder",
      description: "Discover subdomains and analyze attack surfaces using advanced reconnaissance techniques.",
      features: ["DNS Enumeration", "Certificate Analysis", "Brute Force", "API Integration"],
      status: "Ready",
      color: "success",
      href: "/tools/subdomain-finder"

    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-primary" />,
      title: "Phishing URL Detector",
      description: "Identify malicious URLs and phishing attempts using AI-powered analysis and threat intelligence.",
      features: ["URL Reputation", "AI Analysis", "Real-time Scanning", "Threat Intelligence"],
      status: "Ready",
      color: "success",
      href: "/tools/phishing-detector"

    },
    {
      icon: <FileX className="h-8 w-8 text-primary" />,
      title: "File Malware Scanner",
      description: "Scan files for malware, viruses, and suspicious content using multiple detection engines.",
      features: ["Multi-Engine Scan", "Behavioral Analysis", "Sandboxing", "File Reputation"],
      status: "Ready",
      color: "success",
      href: "/tools/malware-scanner"

    }
  ];

  return (
    <section id="tools" className="py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="glass-chip mb-4 rounded-full px-4 py-1.5 uppercase tracking-[0.2em]">
            Security Tools Suite
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Comprehensive Security Arsenal
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Four powerful security tools integrated into one seamless platform. 
            From vulnerability scanning to malware detection, we've got you covered.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {tools.map((tool, index) => (
            <Card key={index} className="glass-card rounded-3xl transition-all duration-500 hover:-translate-y-1 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl group-hover:bg-white/10 transition-colors">
                      {tool.icon}
                    </div>
                    <div>
                      <CardTitle className="font-display text-foreground text-xl mb-2">{tool.title}</CardTitle>
                      <Badge 
                        variant="outline" 
                        className={`glass-chip text-xs ${
                          tool.color === 'success' ? 'border-success text-success' : ''
                        }`}
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        {tool.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground mb-6 text-base leading-relaxed">
                  {tool.description}
                </CardDescription>
                
                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {tool.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Shield className="h-3 w-3 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link to={tool.href} className="flex-1">
                    <Button variant="default" size="sm" className="w-full rounded-full">
                      Try Tool
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integration Notice */}
        <div className="mt-16 text-center">
          <div className="glass-panel rounded-3xl p-8 max-w-2xl mx-auto">
            <Github className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              Seamless Integration Ready
            </h3>
            <p className="text-muted-foreground mb-6">
              All tools are designed for easy integration with your existing GitHub workflow and security stack.
            </p>
            <Button variant="outline" className="rounded-full">
              View Integration Guide
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityTools;