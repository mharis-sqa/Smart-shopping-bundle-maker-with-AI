import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingDown, TrendingUp, Target, Search, BarChart3 } from 'lucide-react';

export const PriceTrackerPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [trackedItems, setTrackedItems] = useState([
    {
      id: '1',
      name: 'iPhone 15 Pro 128GB',
      currentPrice: 999.99,
      targetPrice: 899.99,
      lowestPrice: 949.99,
      priceChange: -49.99,
      priceChangePercent: -5.0,
      vendor: 'Apple Store',
      lastUpdated: '2 hours ago',
      status: 'tracking'
    },
    {
      id: '2',
      name: 'Dyson V15 Detect Vacuum',
      currentPrice: 649.99,
      targetPrice: 549.99,
      lowestPrice: 599.99,
      priceChange: 49.99,
      priceChangePercent: 8.3,
      vendor: 'Best Buy',
      lastUpdated: '1 hour ago',
      status: 'tracking'
    },
    {
      id: '3',
      name: 'AirPods Pro (2nd Gen)',
      currentPrice: 199.99,
      targetPrice: 179.99,
      lowestPrice: 179.99,
      priceChange: 0,
      priceChangePercent: 0,
      vendor: 'Amazon',
      lastUpdated: '30 minutes ago',
      status: 'target_reached'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'target_reached':
        return <Badge className="bg-deals text-deals-foreground">Target Reached</Badge>;
      case 'tracking':
        return <Badge variant="outline">Tracking</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getPriceChangeIcon = (change: number) => {
    if (change < 0) return <TrendingDown className="h-4 w-4 text-deals" />;
    if (change > 0) return <TrendingUp className="h-4 w-4 text-destructive" />;
    return <Target className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <>
      <Helmet>
        <title>Price Tracker - SmartBundle | Monitor Product Prices</title>
        <meta name="description" content="Track product prices across multiple vendors and get alerts when prices drop to your target levels." />
        <link rel="canonical" href={`${window.location.origin}/dashboard/price-tracker`} />
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-deals bg-clip-text text-transparent">
              Price Tracker
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Monitor prices across vendors and get alerts when they hit your target prices
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative min-w-[280px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tracked items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-background/60 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:bg-background transition-all"
              />
            </div>
            <Button size="default" className="h-11 px-6 font-semibold">
              <Target className="h-4 w-4 mr-2" />
              Add Item to Track
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Items Tracked</CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{trackedItems.length}</div>
              <p className="text-sm text-muted-foreground mt-1">Active monitoring</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-deals/5 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Target Reached</CardTitle>
              <div className="p-2 bg-deals/10 rounded-lg">
                <TrendingDown className="h-5 w-5 text-deals" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-deals">
                {trackedItems.filter(item => item.status === 'target_reached').length}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Ready to buy</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Total Savings</CardTitle>
              <div className="p-2 bg-accent/10 rounded-lg">
                <BarChart3 className="h-5 w-5 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">$89.98</div>
              <p className="text-sm text-muted-foreground mt-1">Potential savings</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-deals/5 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Price Drops</CardTitle>
              <div className="p-2 bg-deals/10 rounded-lg">
                <TrendingDown className="h-5 w-5 text-deals" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
              <p className="text-sm text-muted-foreground mt-1">This week</p>
            </CardContent>
          </Card>
        </div>

        {/* Tracked Items */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full max-w-sm mx-auto grid-cols-3 h-12 p-1">
            <TabsTrigger value="all" className="text-sm font-medium">All Items</TabsTrigger>
            <TabsTrigger value="reached" className="text-sm font-medium">Target Reached</TabsTrigger>
            <TabsTrigger value="tracking" className="text-sm font-medium">Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="space-y-4">
              {trackedItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-r from-background to-background/50">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      {/* Product Info */}
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                          {getStatusBadge(item.status)}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            {item.vendor}
                          </span>
                          <span>Updated {item.lastUpdated}</span>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">Current Price</div>
                            <div className="text-2xl font-bold">${item.currentPrice}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">Target Price</div>
                            <div className="text-2xl font-bold text-deals">${item.targetPrice}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">Lowest Price</div>
                            <div className="text-lg font-semibold text-accent">${item.lowestPrice}</div>
                          </div>
                        </div>
                      </div>

                      {/* Price Change & Actions */}
                      <div className="flex flex-col items-center gap-4 min-w-[200px]">
                        <div className="flex items-center justify-center gap-3 p-3 bg-muted/50 rounded-xl min-w-[160px]">
                          {getPriceChangeIcon(item.priceChange)}
                          <div className="text-center">
                            {item.priceChange !== 0 ? (
                              <div className={`font-semibold ${item.priceChange < 0 ? 'text-deals' : 'text-destructive'}`}>
                                {item.priceChange > 0 ? '+' : ''}${Math.abs(item.priceChange)}
                              </div>
                            ) : (
                              <div className="text-muted-foreground font-medium">No change</div>
                            )}
                            {item.priceChange !== 0 && (
                              <div className={`text-xs ${item.priceChange < 0 ? 'text-deals' : 'text-destructive'}`}>
                                ({item.priceChangePercent > 0 ? '+' : ''}{item.priceChangePercent}%)
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="px-4">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            View Chart
                          </Button>
                          {item.status === 'target_reached' && (
                            <Button size="sm" className="px-4 font-semibold">
                              Buy Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reached">
            <div className="space-y-4">
              {trackedItems.filter(item => item.status === 'target_reached').map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.vendor}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-deals">${item.currentPrice}</div>
                        <Button size="sm">Buy Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tracking">
            <div className="space-y-4">
              {trackedItems.filter(item => item.status === 'tracking').map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.vendor}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">${item.currentPrice}</div>
                        <div className="text-sm text-muted-foreground">Target: ${item.targetPrice}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};