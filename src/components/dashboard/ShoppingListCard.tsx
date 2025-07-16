import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Users, 
  Calendar, 
  MoreVertical,
  Edit,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";

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

interface ShoppingListCardProps {
  list: ShoppingList;
  onUpdate: () => void;
}

export const ShoppingListCard = ({ list, onUpdate }: ShoppingListCardProps) => {
  const getListTypeColor = (type: string) => {
    switch (type) {
      case 'grocery':
        return 'bg-accent text-accent-foreground';
      case 'household':
        return 'bg-deals text-deals-foreground';
      case 'personal_care':
        return 'bg-ai text-ai-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{list.title}</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className={getListTypeColor(list.list_type)}>
                {list.list_type}
              </Badge>
              {list.is_shared && (
                <Badge variant="outline">
                  <Users className="mr-1 h-3 w-3" />
                  Shared
                </Badge>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit List
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete List
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {list.description && (
            <p className="text-sm text-muted-foreground">{list.description}</p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {list.item_count || 0} items
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(list.updated_at), { addSuffix: true })}
              </span>
            </div>
          </div>
          
          <Button className="w-full" variant="outline">
            Open List
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};