import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, BellOff, TrendingDown, Mail, Smartphone, Search, Plus } from 'lucide-react';

export const AlertsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      productName: 'iPhone 15 Pro 128GB',
      currentPrice: 999.99,
      targetPrice: 899.99,
      vendor: 'Apple Store',
      isActive: true,
      alertType: 'price_drop',
      createdAt: '2024-01-15',
      lastTriggered: null
    },
    {
      id: '2',
      productName: 'AirPods Pro (2nd Gen)',
      currentPrice: 249.99,
      targetPrice: 199.99,
      vendor: 'Amazon',
      isActive: true,
      alertType: 'price_drop',
      createdAt: '2024-01-10',
      lastTriggered: '2024-01-16'
    },
    {
      id: '3',
      productName: 'Dyson V15 Detect',
      currentPrice: 649.99,
      targetPrice: 549.99,
      vendor: 'Best Buy',
      isActive: false,
      alertType: 'back_in_stock',
      createdAt: '2024-01-05',
      lastTriggered: null
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    pushNotifications: true,
    instantAlerts: true,
    dailyDigest: false,
    weeklyReport: true
  });

  const toggleAlert = (alertId: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case 'price_drop':
        return <TrendingDown className="h-4 w-4 text-deals" />;
      case 'back_in_stock':
        return <Bell className="h-4 w-4 text-primary" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getAlertTypeBadge = (type: string) => {
    switch (type) {
      case 'price_drop':
        return <Badge className="bg-deals text-deals-foreground">Price Drop</Badge>;
      case 'back_in_stock':
        return <Badge variant="outline">Back in Stock</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  return (
    <>
      <Helmet>
        <title>Price Alerts - SmartBundle | Smart Shopping Notifications</title>
        <meta name="description" content="Manage your price drop alerts and notifications. Get notified when products reach your target prices." />
        <link rel="canonical" href={`${window.location.origin}/dashboard/alerts`} />
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Price Alerts
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Stay informed with smart notifications for price drops and product availability
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative min-w-[280px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts and products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-background/60 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:bg-background transition-all"
              />
            </div>
            <Button size="default" className="h-11 px-6 font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </div>
        </div>

        {/* Alert Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Active Alerts</CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bell className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{alerts.filter(a => a.isActive).length}</div>
              <p className="text-sm text-muted-foreground mt-1">Currently monitoring</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-deals/5 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Triggered Today</CardTitle>
              <div className="p-2 bg-deals/10 rounded-lg">
                <TrendingDown className="h-5 w-5 text-deals" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-deals">2</div>
              <p className="text-sm text-muted-foreground mt-1">Price drops detected</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Total Alerts</CardTitle>
              <div className="p-2 bg-accent/10 rounded-lg">
                <Bell className="h-5 w-5 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{alerts.length}</div>
              <p className="text-sm text-muted-foreground mt-1">All time created</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-deals/5 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Potential Savings</CardTitle>
              <div className="p-2 bg-deals/10 rounded-lg">
                <TrendingDown className="h-5 w-5 text-deals" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-deals">$149.98</div>
              <p className="text-sm text-muted-foreground mt-1">When targets hit</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Management */}
        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-12 p-1">
            <TabsTrigger value="alerts" className="text-sm font-medium">My Alerts</TabsTrigger>
            <TabsTrigger value="settings" className="text-sm font-medium">Notification Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-4">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <Card key={alert.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getAlertTypeIcon(alert.alertType)}
                          <h3 className="font-semibold">{alert.productName}</h3>
                          {getAlertTypeBadge(alert.alertType)}
                          {alert.lastTriggered && (
                            <Badge variant="secondary">Recently Triggered</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {alert.vendor} • Created {new Date(alert.createdAt).toLocaleDateString()}
                          {alert.lastTriggered && (
                            <> • Last triggered {new Date(alert.lastTriggered).toLocaleDateString()}</>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="text-right">
                          <div className="text-lg font-bold">${alert.currentPrice}</div>
                          <div className="text-sm text-muted-foreground">
                            Target: ${alert.targetPrice}
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id={`alert-${alert.id}`}
                              checked={alert.isActive}
                              onCheckedChange={() => toggleAlert(alert.id)}
                            />
                            <Label htmlFor={`alert-${alert.id}`} className="text-sm">
                              {alert.isActive ? 'Active' : 'Paused'}
                            </Label>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Choose how you want to be notified about price changes and deals
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <Label className="text-base">Email Alerts</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get notified via email when prices drop
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      <Label className="text-base">Push Notifications</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications on your device
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <Label className="text-base">Instant Alerts</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get notified immediately when your target price is reached
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.instantAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, instantAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Daily Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Daily summary of price changes and new deals
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.dailyDigest}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, dailyDigest: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Weekly Report</Label>
                    <p className="text-sm text-muted-foreground">
                      Weekly summary of your savings and tracking performance
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.weeklyReport}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, weeklyReport: checked })
                    }
                  />
                </div>

                <div className="pt-4">
                  <Button>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};