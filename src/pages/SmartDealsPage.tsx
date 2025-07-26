import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingDown, Package, Star, Search, Filter, Sparkles, ShoppingBag } from 'lucide-react';

export const SmartDealsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [deals, setDeals] = useState([
    {
      id: '1',
      title: 'Organic Almond Milk Bundle',
      originalPrice: 45.96,
      dealPrice: 32.99,
      savings: 12.97,
      savingsPercent: 28,
      vendor: 'Amazon',
      rating: 4.5,
      items: ['Silk Almond Milk (6 pack)', 'Blue Diamond Almonds (3 pack)'],
      category: 'Groceries',
      aiReason: 'Based on your shopping history, this bundle saves you 28% on frequently bought items.'
    },
    {
      id: '2',
      title: 'Cleaning Essentials Pack',
      originalPrice: 89.99,
      dealPrice: 59.99,
      savings: 30.00,
      savingsPercent: 33,
      vendor: 'Target',
      rating: 4.7,
      items: ['Tide Pods (2 pack)', 'Dawn Dish Soap (3 pack)', 'Lysol Wipes (4 pack)'],
      category: 'Household',
      aiReason: 'AI detected price drop across multiple items. Bundle saves more than individual purchases.'
    }
  ]);

  return (
    <>
      <Helmet>
        <title>Smart Deals - SmartBundle | AI-Powered Deal Discovery</title>
        <meta name="description" content="Discover AI-curated deals and bundles across multiple vendors. Save money with intelligent deal recommendations." />
        <link rel="canonical" href={`${window.location.origin}/dashboard/deals`} />
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Smart Deals
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              AI-curated deals and bundles to maximize your savings across trusted vendors
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative min-w-[280px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-background/60 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:bg-background transition-all"
              />
            </div>
            <Button variant="outline" size="default" className="px-4 h-11">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Deals Section */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 h-12 p-1">
            <TabsTrigger value="all" className="text-sm font-medium">All Deals</TabsTrigger>
            <TabsTrigger value="groceries" className="text-sm font-medium">Groceries</TabsTrigger>
            <TabsTrigger value="household" className="text-sm font-medium">Household</TabsTrigger>
            <TabsTrigger value="personal" className="text-sm font-medium">Personal</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {deals.map((deal) => (
                <Card key={deal.id} className="group hover:shadow-xl hover:shadow-deals/20 transition-all duration-300 border-0 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs font-medium">
                            {deal.category}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">{deal.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                          {deal.title}
                        </CardTitle>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-3xl font-bold text-deals">
                          ${deal.dealPrice}
                        </div>
                        <div className="text-sm text-muted-foreground line-through">
                          ${deal.originalPrice}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-5">
                    {/* Savings Highlight */}
                    <div className="flex items-center justify-center p-3 bg-deals/10 rounded-xl">
                      <TrendingDown className="h-5 w-5 text-deals mr-2" />
                      <span className="text-lg font-semibold text-deals">
                        Save ${deal.savings} ({deal.savingsPercent}%)
                      </span>
                    </div>

                    {/* Bundle Items */}
                    <div className="space-y-3">
                      <div className="text-sm font-semibold text-foreground">Bundle includes:</div>
                      <ul className="space-y-2">
                        {deal.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <Package className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* AI Insight */}
                    <div className="bg-gradient-to-r from-ai/10 to-primary/10 p-4 rounded-xl border border-ai/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-ai" />
                        <span className="text-sm font-semibold text-ai">AI Insight</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {deal.aiReason}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <Badge variant="outline" className="font-medium">
                        {deal.vendor}
                      </Badge>
                      <Button className="font-semibold px-6">
                        View Deal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="groceries">
            <div className="text-center py-16">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Grocery Deals Coming Soon</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We're curating the best grocery deals from top retailers. Check back soon for amazing savings!
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="household">
            <div className="text-center py-16">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Package className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Household Deals Coming Soon</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Discover bulk savings on household essentials and cleaning supplies.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="personal">
            <div className="text-center py-16">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-deals/20 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="h-8 w-8 text-deals" />
                </div>
                <h3 className="text-xl font-semibold">Personal Care Deals Coming Soon</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Find the best deals on beauty, health, and personal care products.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};