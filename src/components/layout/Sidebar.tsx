import { User } from '@supabase/supabase-js';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  List, 
  ShoppingBag, 
  TrendingDown, 
  Bell, 
  Sparkles, 
  Users,
  Plus,
  UserCircle,
  Settings
} from "lucide-react";

interface SidebarProps {
  user: User;
}

export const Sidebar = ({ user }: SidebarProps) => {
  const location = useLocation();
  
  const menuItems = [
    { icon: List, label: "My Lists", path: "/dashboard", badge: null },
    { icon: ShoppingBag, label: "Smart Deals", path: "/dashboard/deals", badge: "3" },
    { icon: TrendingDown, label: "Price Tracker", path: "/dashboard/price-tracker", badge: "2" },
    { icon: Bell, label: "Alerts", path: "/dashboard/alerts", badge: null },
    { icon: Sparkles, label: "AI Assistant", path: "/dashboard/ai-assistant", badge: null },
    { icon: Users, label: "Shared Lists", path: "/dashboard/shared-lists", badge: null },
    { icon: UserCircle, label: "Profile", path: "/dashboard/profile", badge: null },
    { icon: Settings, label: "Settings", path: "/dashboard/settings", badge: null },
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
              variant={location.pathname === item.path ? "default" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link to={item.path}>
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
                {item.badge && (
                  <span className="ml-auto bg-deals text-deals-foreground text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
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