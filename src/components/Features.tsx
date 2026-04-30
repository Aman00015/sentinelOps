import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Shield, 
  BarChart3, 
  Clock, 
  Users, 
  Database,
  Brain,
  Lock,
  Activity
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms provide deep insights and accurate threat detection."
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Real-time Monitoring",
      description: "Continuous monitoring and instant alerts for immediate threat response."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Comprehensive Reports",
      description: "Detailed analytics and actionable insights for informed security decisions."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Automated Workflows",
      description: "Streamlined processes that reduce manual effort and response times."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Team Collaboration",
      description: "Built for teams with role-based access and collaborative security management."
    },
    {
      icon: <Database className="h-6 w-6 text-primary" />,
      title: "Threat Intelligence",
      description: "Access to global threat intelligence and vulnerability databases."
    }
  ];

  const stats = [
    { number: "99.9%", label: "Uptime Guarantee", icon: <Activity className="h-5 w-5 text-primary" /> },
    { number: "10M+", label: "Threats Detected", icon: <Shield className="h-5 w-5 text-primary" /> },
    { number: "<5min", label: "Average Response", icon: <Clock className="h-5 w-5 text-primary" /> },
    { number: "256-bit", label: "Encryption", icon: <Lock className="h-5 w-5 text-primary" /> }
  ];

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="glass-chip mb-4 rounded-full px-4 py-1.5 uppercase tracking-[0.2em]">
            Platform Features
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Built for Modern Security
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Every feature is designed to enhance your security posture and streamline your cybersecurity operations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card rounded-2xl transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-xl border border-white/10 bg-white/[0.06] backdrop-blur-xl group-hover:bg-white/10 transition-colors">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-display text-xl text-foreground">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="glass-panel rounded-3xl p-8">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              Trusted by Security Teams Worldwide
            </h3>
            <p className="text-muted-foreground">
              Industry-leading performance and reliability metrics
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;