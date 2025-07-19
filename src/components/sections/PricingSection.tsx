import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with smart shopping",
      icon: Check,
      features: [
        "Up to 3 shopping lists",
        "Basic AI suggestions",
        "Price tracking for 10 items",
        "Share lists with 2 people",
        "Email notifications"
      ],
      cta: "Start Free",
      ctaVariant: "outline" as const,
      popular: false
    },
    {
      name: "Pro",
      price: "$8",
      period: "per month",
      description: "Everything you need for power shopping",
      icon: Sparkles,
      features: [
        "Unlimited shopping lists",
        "Advanced AI deal finder",
        "Price tracking for unlimited items",
        "Real-time collaboration",
        "Priority customer support",
        "Bundle optimization",
        "Historical price analytics",
        "Smart reorder reminders"
      ],
      cta: "Start Pro Trial",
      ctaVariant: "default" as const,
      popular: true
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you need more. No hidden fees or surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden ${
                plan.popular 
                  ? 'border-primary shadow-[var(--shadow-glow)] scale-105' 
                  : 'border-border hover:shadow-lg'
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-accent text-white text-sm font-medium px-4 py-1 rounded-bl-lg">
                  <Zap className="inline h-4 w-4 mr-1" />
                  Most Popular
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-primary to-accent' 
                    : 'bg-secondary'
                }`}>
                  <plan.icon className={`h-6 w-6 ${
                    plan.popular ? 'text-white' : 'text-primary'
                  }`} />
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/{plan.period}</span>
                </div>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-6">
                  <Button 
                    asChild
                    variant={plan.ctaVariant}
                    size="lg" 
                    className="w-full"
                  >
                    <Link to="/signup">
                      {plan.cta}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            All plans include 14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};