import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  TrendingDown, 
  Bell, 
  Sparkles, 
  Plus,
  Heart,
  DollarSign,
  Users
} from "lucide-react";
import { ShoppingListCard } from './ShoppingListCard';
import { CreateListDialog } from './CreateListDialog';
import { AIAssistant } from '../ai/AIAssistant';

interface DashboardViewProps {
  user: User;
}

interface ShoppingList {
  id: string;
  title: string;
  description: string;
  list_type: string;
  is_shared: boolean;
  shared_with: string[];
  created_at: string;
  updated_at: string;
  item_count?: number;
}

export const DashboardView = ({ user }: DashboardViewProps) => {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const { data, error } = await supabase
        .from('lists')
        .select(`
          *,
          list_items(count)
        `)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      
      const listsWithCounts = data?.map(list => ({
        ...list,
        item_count: list.list_items?.[0]?.count || 0
      })) || [];
      
      setLists(listsWithCounts);
    } catch (error) {
      console.error('Error fetching lists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleListCreated = () => {
    fetchLists();
    setShowCreateDialog(false);
  };

  const stats = [
    {
      title: "Active Lists",
      value: lists.length,
      icon: ShoppingCart,
      color: "text-primary"
    },
    {
      title: "Total Items",
      value: lists.reduce((sum, list) => sum + (list.item_count || 0), 0),
      icon: Heart,
      color: "text-accent"
    },
    {
      title: "Shared Lists",
      value: lists.filter(list => list.is_shared).length,
      icon: Users,
      color: "text-deals"
    },
    {
      title: "Savings This Month",
      value: "$127.50",
      icon: DollarSign,
      color: "text-ai"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your lists.</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} size="lg">
          <Plus className="mr-2 h-4 w-4" />
          New List
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center space-x-3">
            <Sparkles className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-sm text-muted-foreground">Get smart suggestions</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-r from-deals/10 to-accent/10">
          <div className="flex items-center space-x-3">
            <TrendingDown className="h-6 w-6 text-deals" />
            <div>
              <h3 className="font-semibold">Price Tracker</h3>
              <p className="text-sm text-muted-foreground">Monitor price drops</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-r from-ai/10 to-primary/10">
          <div className="flex items-center space-x-3">
            <Bell className="h-6 w-6 text-ai" />
            <div>
              <h3 className="font-semibold">Smart Alerts</h3>
              <p className="text-sm text-muted-foreground">Never miss deals</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shopping Lists */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Shopping Lists</h2>
            <Badge variant="secondary">{lists.length} lists</Badge>
          </div>
          
          {lists.length === 0 ? (
            <Card className="p-8 text-center">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No lists yet</h3>
              <p className="text-muted-foreground mb-4">Create your first smart shopping list to get started</p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First List
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lists.map((list) => (
                <ShoppingListCard key={list.id} list={list} onUpdate={fetchLists} />
              ))}
            </div>
          )}
        </div>

        {/* AI Assistant Sidebar */}
        <div className="lg:col-span-1">
          <AIAssistant user={user} />
        </div>
      </div>

      <CreateListDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onListCreated={handleListCreated}
      />
    </div>
  );
};