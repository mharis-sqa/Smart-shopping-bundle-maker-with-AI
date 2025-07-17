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

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Price Tracker</h1>
            <p className="text-muted-foreground">Monitor prices and get notified when they hit your targets</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tracked items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            <Button>
              Add Item to Track
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Items Tracked</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{trackedItems.length}</div>
              <p className="text-xs text-muted-foreground">Active monitoring</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Target Reached</CardTitle>
              <TrendingDown className="h-4 w-4 text-deals" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-deals">
                {trackedItems.filter(item => item.status === 'target_reached').length}
              </div>
              <p className="text-xs text-muted-foreground">Ready to buy</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-deals">$89.98</div>
              <p className="text-xs text-muted-foreground">Potential savings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Price Drops</CardTitle>
              <TrendingDown className="h-4 w-4 text-deals" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="reached">Target Reached</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="space-y-4">
              {trackedItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{item.name}</h3>
                          {getStatusBadge(item.status)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Sold by {item.vendor} • Updated {item.lastUpdated}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold">${item.currentPrice}</div>
                          <div className="text-sm text-muted-foreground">
                            Target: ${item.targetPrice}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 min-w-24">
                          {getPriceChangeIcon(item.priceChange)}
                          <div className="text-sm">
                            {item.priceChange !== 0 && (
                              <span className={item.priceChange < 0 ? 'text-deals' : 'text-destructive'}>
                                {item.priceChange > 0 ? '+' : ''}${item.priceChange} ({item.priceChangePercent > 0 ? '+' : ''}{item.priceChangePercent}%)
                              </span>
                            )}
                            {item.priceChange === 0 && (
                              <span className="text-muted-foreground">No change</span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Chart
                          </Button>
                          {item.status === 'target_reached' && (
                            <Button size="sm">
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