import { CheckCircle, Search, TrendingDown, Users } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      step: "1",
      icon: CheckCircle,
      title: "Create Smart Lists",
      description: "Add items manually or let AI suggest what you need based on your shopping history and preferences."
    },
    {
      step: "2", 
      icon: Search,
      title: "Get AI Deals",
      description: "Our AI scans multiple platforms to find the best bundles, discounts, and alternatives for your items."
    },
    {
      step: "3",
      icon: TrendingDown,
      title: "Track & Save",
      description: "Monitor price drops, get alerts when items go on sale, and never miss a great deal again."
    },
    {
      step: "4",
      icon: Users,
      title: "Share & Collaborate", 
      description: "Share lists with family and friends in real-time. Everyone stays updated on what's needed."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How SmartBundle Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to smarter shopping and significant savings
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-deals text-deals-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};