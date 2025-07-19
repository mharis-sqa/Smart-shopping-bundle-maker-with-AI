import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';
import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/components/layout/MainLayout";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Welcome to SmartBundle!",
            description: "You're now logged in and ready to create smart shopping lists.",
          });
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>SmartBundle - AI-Powered Smart Shopping Lists & Deal Aggregator</title>
          <meta name="description" content="Build intelligent shopping lists, track prices across platforms, and get AI-powered recommendations for better deals and healthier choices. Start saving money today!" />
          <meta name="keywords" content="smart shopping lists, AI deals, price tracking, shopping assistant, save money, deal aggregator" />
          <meta property="og:title" content="SmartBundle - AI-Powered Smart Shopping Lists" />
          <meta property="og:description" content="Build intelligent shopping lists, track prices across platforms, and get AI-powered recommendations for better deals." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://smartbundle.com" />
          <link rel="canonical" href="https://smartbundle.com" />
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
          <LandingNavbar />
          <HeroSection />
          <div id="how-it-works">
            <HowItWorksSection />
          </div>
          <div id="features">
            <TestimonialsSection />
          </div>
          <div id="pricing">
            <PricingSection />
          </div>
          <FooterSection />
        </div>
      </>
    );
  }

  return (
    <MainLayout user={user}>
      <DashboardView user={user} />
    </MainLayout>
  );
};

export default Index;
