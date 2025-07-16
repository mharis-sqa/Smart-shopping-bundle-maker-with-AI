import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Sparkles, 
  Send, 
  Bot, 
  DollarSign, 
  ShoppingCart,
  TrendingDown,
  Leaf
} from "lucide-react";

interface AIAssistantProps {
  user: User;
}

export const AIAssistant = ({ user }: AIAssistantProps) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setResponse('');
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-shopping-assistant', {
        body: {
          query: query.trim(),
          user_id: user.id,
          context: 'dashboard'
        }
      });
      
      if (error) throw error;
      
      setResponse(data.recommendation);
      toast({
        title: "AI Assistant",
        description: "Got your recommendation! Check the response below.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to get AI recommendation",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const suggestedQueries = [
    "Find the best deals on groceries for a family of 4",
    "What are some healthy alternatives to processed snacks?",
    "Help me build a budget-friendly weekly meal plan",
    "What are the most eco-friendly cleaning products?",
    "Find bundle deals for back-to-school supplies"
  ];

  const handleSuggestedQuery = (suggestedQuery: string) => {
    setQuery(suggestedQuery);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-ai/20 to-primary/20 rounded-full">
            <Sparkles className="h-5 w-5 text-ai" />
          </div>
          <span>AI Shopping Assistant</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Ask me anything about shopping, deals, or product recommendations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={3}
            className="resize-none"
          />
          <Button type="submit" disabled={loading || !query.trim()} className="w-full">
            {loading ? (
              <>
                <Bot className="mr-2 h-4 w-4 animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Ask AI Assistant
              </>
            )}
          </Button>
        </form>

        {!response && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Try asking:</p>
            <div className="space-y-2">
              {suggestedQueries.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedQuery(suggestion)}
                  className="w-full text-left justify-start h-auto py-2 px-3 text-xs"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        {response && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Bot className="h-4 w-4 text-ai" />
              <span className="text-sm font-medium">AI Recommendation</span>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm whitespace-pre-wrap">{response}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                <DollarSign className="mr-1 h-3 w-3" />
                Money Saving
              </Badge>
              <Badge variant="secondary">
                <ShoppingCart className="mr-1 h-3 w-3" />
                Smart Shopping
              </Badge>
              <Badge variant="secondary">
                <TrendingDown className="mr-1 h-3 w-3" />
                Best Deals
              </Badge>
              <Badge variant="secondary">
                <Leaf className="mr-1 h-3 w-3" />
                Eco-Friendly
              </Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setResponse('');
                setQuery('');
              }}
              className="w-full"
            >
              Ask Another Question
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};