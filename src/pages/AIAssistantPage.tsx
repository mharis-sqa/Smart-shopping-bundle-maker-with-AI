import { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, Sparkles, ShoppingBag, TrendingDown, History, Mic } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export const AIAssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your AI shopping assistant. I can help you find the best deals, suggest alternatives, optimize your shopping lists, and answer questions about products. What would you like to help with today?",
      timestamp: new Date(),
      suggestions: [
        "Find cheaper alternatives to Tide detergent",
        "What's the best time to buy electronics?",
        "Help me optimize my grocery list",
        "Compare prices for wireless earbuds"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I can help you with "${inputValue}". Based on your shopping history and current market data, here are my recommendations...`,
        timestamp: new Date(),
        suggestions: [
          "Tell me more about this",
          "Show me alternatives",
          "Add to my shopping list"
        ]
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const quickActions = [
    { icon: ShoppingBag, label: "Optimize my current list", action: "optimize-list" },
    { icon: TrendingDown, label: "Find best deals today", action: "find-deals" },
    { icon: Sparkles, label: "Suggest healthy alternatives", action: "healthy-alternatives" },
    { icon: History, label: "Review my shopping patterns", action: "shopping-patterns" }
  ];

  return (
    <>
      <Helmet>
        <title>AI Assistant - SmartBundle | Smart Shopping Help</title>
        <meta name="description" content="Get personalized shopping advice from our AI assistant. Find deals, optimize lists, and make better shopping decisions." />
        <link rel="canonical" href={`${window.location.origin}/dashboard/ai-assistant`} />
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-ai to-primary bg-clip-text text-transparent">
              AI Shopping Assistant
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Get personalized advice, smart recommendations, and optimize your shopping experience with AI
            </p>
          </div>
          
          <Button variant="outline" size="default" className="h-11 px-6">
            <History className="h-4 w-4 mr-2" />
            Chat History
          </Button>
        </div>

        {/* Chat Interface */}
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <Card className="h-[700px] flex flex-col border-0 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-4 border-b bg-gradient-to-r from-ai/5 to-primary/5">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-ai/10 rounded-lg">
                    <Sparkles className="h-6 w-6 text-ai" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">AI Shopping Assistant</div>
                    <div className="text-sm text-muted-foreground font-normal">
                      Powered by advanced AI • Ready to help
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] ${message.type === 'user' ? 'order-1' : 'order-2'}`}>
                        {message.type === 'assistant' && (
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-ai to-primary rounded-full flex items-center justify-center">
                              <Sparkles className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-sm font-medium text-ai">AI Assistant</span>
                          </div>
                        )}
                        
                        <div
                          className={`rounded-2xl p-4 shadow-sm ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground ml-4'
                              : 'bg-gradient-to-r from-muted to-muted/50 mr-4'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          
                          {message.suggestions && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {message.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="secondary"
                                  size="sm"
                                  className="text-xs h-8 px-3 cursor-pointer hover:bg-secondary/80 transition-colors"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          )}
                          
                          <p className="text-xs opacity-70 mt-3">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%]">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-ai to-primary rounded-full flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-sm font-medium text-ai">AI Assistant</span>
                        </div>
                        <div className="bg-gradient-to-r from-muted to-muted/50 rounded-2xl p-4 mr-4">
                          <div className="flex items-center gap-3">
                            <div className="animate-pulse flex space-x-1">
                              <div className="w-2 h-2 bg-ai rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-ai rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-ai rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                            <span className="text-sm text-muted-foreground">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-6 border-t bg-gradient-to-r from-background to-muted/20">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Ask me anything about shopping, deals, or products..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="h-12 pr-12 bg-background/60 backdrop-blur-sm border-border/50 focus:border-ai/50 focus:bg-background transition-all"
                      />
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="absolute right-1 top-1 h-10 w-10 hover:bg-ai/10"
                      >
                        <Mic className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                    
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={!inputValue.trim() || isLoading}
                      size="default"
                      className="h-12 px-6 bg-gradient-to-r from-ai to-primary hover:from-ai/90 hover:to-primary/90 font-semibold"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start h-auto p-3"
                    onClick={() => handleSuggestionClick(action.label)}
                  >
                    <action.icon className="h-4 w-4 mr-3" />
                    <span className="text-left">{action.label}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-deals" />
                    <span className="text-sm font-medium">Price Drop Alert</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    3 items on your watchlist dropped in price today
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Shopping Tip</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Best time to buy groceries is Tuesday-Wednesday for maximum savings
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">AI Suggestion</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Consider bulk buying paper products - 23% savings available
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};