import { User } from '@supabase/supabase-js';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  List, 
  ShoppingBag, 
  TrendingDown, 
  Bell, 
  Sparkles, 
  Users,
  Plus
} from "lucide-react";

interface SidebarProps {
  user: User;
}

export const Sidebar = ({ user }: SidebarProps) => {
  const menuItems = [
    { icon: List, label: "My Lists", active: true },
    { icon: ShoppingBag, label: "Smart Deals", badge: "3" },
    { icon: TrendingDown, label: "Price Tracker", badge: "2" },
    { icon: Bell, label: "Alerts" },
    { icon: Sparkles, label: "AI Assistant" },
    { icon: Users, label: "Shared Lists" },
  ];

  return (
    <aside className="w-64 p-4 space-y-4">
      <Card className="p-4">
        <Button className="w-full" size="lg">
          <Plus className="mr-2 h-4 w-4" />
          New Shopping List
        </Button>
      </Card>
      
      <Card className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
              {item.badge && (
                <span className="ml-auto bg-deals text-deals-foreground text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </Button>
          ))}
        </nav>
      </Card>
      
      <Card className="p-4 bg-gradient-to-br from-accent/10 to-primary/10">
        <h3 className="font-semibold text-sm mb-2">💡 Smart Tip</h3>
        <p className="text-xs text-muted-foreground">
          Use our AI assistant to find the best deals on your favorite products!
        </p>
      </Card>
    </aside>
  );
};