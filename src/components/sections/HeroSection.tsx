import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  ShoppingCart, 
  Brain, 
  TrendingDown, 
  Users, 
  Sparkles,
  Target,
  ArrowRight
} from "lucide-react";

export const HeroSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Lists",
      description: "Smart suggestions and optimized shopping"
    },
    {
      icon: TrendingDown,
      title: "Price Tracking",
      description: "Never miss a deal with real-time alerts"
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "Share lists with family and friends"
    },
    {
      icon: Target,
      title: "Bundle Deals",
      description: "Find the best combinations and save more"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-full">
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-deals bg-clip-text text-transparent">
              SmartBundle
            </h1>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground max-w-3xl mx-auto">
            AI-Powered Smart Shopping Lists + Deal Aggregator
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Build intelligent shopping lists, track prices across platforms, and get AI-powered 
            recommendations for better deals and healthier choices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="text-lg px-8 shadow-[var(--shadow-glow)] hover:shadow-lg transition-all duration-300">
              <Link to="/signup">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Saving Now
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 hover:bg-secondary/50 transition-all duration-300">
              <a href="#how-it-works">
                See How It Works
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full w-fit mx-auto mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};