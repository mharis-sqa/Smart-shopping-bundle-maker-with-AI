import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingDown, Package, Star, Search, Filter } from 'lucide-react';

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

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Smart Deals</h1>
            <p className="text-muted-foreground">AI-curated deals and bundles to maximize your savings</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Deals</TabsTrigger>
            <TabsTrigger value="groceries">Groceries</TabsTrigger>
            <TabsTrigger value="household">Household</TabsTrigger>
            <TabsTrigger value="personal">Personal Care</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {deals.map((deal) => (
                <Card key={deal.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg line-clamp-2">{deal.title}</CardTitle>
                        <Badge variant="secondary">{deal.category}</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-deals">${deal.dealPrice}</div>
                        <div className="text-sm text-muted-foreground line-through">${deal.originalPrice}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-deals" />
                        <span className="text-sm font-medium text-deals">
                          Save ${deal.savings} ({deal.savingsPercent}%)
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{deal.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Bundle includes:</div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {deal.items.map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Package className="h-3 w-3" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-accent/10 p-3 rounded-lg">
                      <div className="text-sm font-medium mb-1">AI Insight</div>
                      <div className="text-sm text-muted-foreground">{deal.aiReason}</div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Badge variant="outline">{deal.vendor}</Badge>
                      <Button size="sm">
                        View Deal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="groceries">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Grocery deals will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="household">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Household deals will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="personal">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Personal care deals will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};