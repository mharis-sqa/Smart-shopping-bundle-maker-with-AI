import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { SignInPage } from "@/components/auth/SignInPage";
import { SignUpPage } from "@/components/auth/SignUpPage";
import Index from "./pages/Index";
import { SmartDealsPage } from "./pages/SmartDealsPage";
import { PriceTrackerPage } from "./pages/PriceTrackerPage";
import { AlertsPage } from "./pages/AlertsPage";
import { AIAssistantPage } from "./pages/AIAssistantPage";
import { SharedListsPage } from "./pages/SharedListsPage";
import { UserProfilePage } from "./pages/UserProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<RequireAuth><Index /></RequireAuth>} />
            <Route path="/dashboard/deals" element={<RequireAuth><SmartDealsPage /></RequireAuth>} />
            <Route path="/dashboard/price-tracker" element={<RequireAuth><PriceTrackerPage /></RequireAuth>} />
            <Route path="/dashboard/alerts" element={<RequireAuth><AlertsPage /></RequireAuth>} />
            <Route path="/dashboard/ai-assistant" element={<RequireAuth><AIAssistantPage /></RequireAuth>} />
            <Route path="/dashboard/shared-lists" element={<RequireAuth><SharedListsPage /></RequireAuth>} />
            <Route path="/dashboard/profile" element={<RequireAuth><UserProfilePage /></RequireAuth>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
