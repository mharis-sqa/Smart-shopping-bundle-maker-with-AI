import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Share2, 
  Edit, 
  MoreHorizontal,
  Check,
  X,
  ShoppingCart,
  DollarSign,
  Users,
  Calendar
} from 'lucide-react';

export const OpenListPage = () => {
  const { listId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [newItemName, setNewItemName] = useState('');
  
  // Mock data - replace with actual API calls
  const [listData] = useState({
    id: listId || '1',
    title: 'Family Grocery List',
    description: 'Weekly grocery shopping for the Smith family',
    createdAt: '2024-01-15',
    updatedAt: '2 hours ago',
    totalItems: 12,
    completedItems: 3,
    estimatedTotal: 156.78,
    owner: { name: 'John Smith', email: 'john@example.com', avatar: null },
    collaborators: [
      { name: 'Sarah Smith', email: 'sarah@example.com', avatar: null, role: 'editor' },
      { name: 'Mike Johnson', email: 'mike@example.com', avatar: null, role: 'viewer' }
    ],
    isShared: true
  });

  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Organic Bananas',
      quantity: 6,
      unit: 'pieces',
      estimatedPrice: 3.99,
      actualPrice: null,
      isCompleted: false,
      addedBy: 'John Smith',
      priority: 'medium',
      notes: 'Make sure they are not too ripe'
    },
    {
      id: '2',
      name: 'Whole Milk',
      quantity: 1,
      unit: 'gallon',
      estimatedPrice: 4.29,
      actualPrice: 4.15,
      isCompleted: true,
      addedBy: 'Sarah Smith',
      priority: 'high',
      notes: null
    },
    {
      id: '3',
      name: 'Bread - Whole Wheat',
      quantity: 2,
      unit: 'loaves',
      estimatedPrice: 5.98,
      actualPrice: null,
      isCompleted: false,
      addedBy: 'John Smith',
      priority: 'medium',
      notes: null
    }
  ]);

  const toggleItem = (itemId: string) => {
    setItems(items.map(item =>
      item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

  const addNewItem = () => {
    if (newItemName.trim()) {
      const newItem = {
        id: Date.now().toString(),
        name: newItemName,
        quantity: 1,
        unit: 'piece',
        estimatedPrice: 0,
        actualPrice: null,
        isCompleted: false,
        addedBy: 'You',
        priority: 'medium' as const,
        notes: null
      };
      setItems([...items, newItem]);
      setNewItemName('');
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return null;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const completionPercentage = Math.round((items.filter(item => item.isCompleted).length / items.length) * 100);

  return (
    <>
      <Helmet>
        <title>{listData.title} - SmartBundle | Shopping List</title>
        <meta name="description" content={`View and manage your ${listData.title} shopping list with ${listData.totalItems} items.`} />
        <link rel="canonical" href={`${window.location.origin}/dashboard/lists/${listId}`} />
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold">{listData.title}</h1>
              {listData.isShared && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  Shared
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{listData.description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Updated {listData.updatedAt}
              </span>
              <span className="flex items-center gap-1">
                <ShoppingCart className="h-4 w-4" />
                {items.length} items
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                Est. ${listData.estimatedTotal}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/dashboard/lists/${listId}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </Button>
          </div>
        </div>

        {/* Progress & Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Completion</p>
                  <p className="text-2xl font-bold">{completionPercentage}%</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Items</p>
                  <p className="text-2xl font-bold">{items.filter(item => !item.isCompleted).length}/{items.length}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Estimated</p>
                  <p className="text-2xl font-bold">${listData.estimatedTotal}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-deals/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-deals" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Collaborators</p>
                  <p className="text-2xl font-bold">{listData.collaborators.length + 1}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Collaborators */}
        {listData.isShared && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Collaborators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-primary/10 rounded-full px-3 py-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={listData.owner.avatar} />
                    <AvatarFallback className="text-xs">
                      {getInitials(listData.owner.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{listData.owner.name}</span>
                  <Badge variant="default" className="text-xs">Owner</Badge>
                </div>
                {listData.collaborators.map((collaborator, index) => (
                  <div key={index} className="flex items-center gap-2 bg-muted rounded-full px-3 py-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={collaborator.avatar} />
                      <AvatarFallback className="text-xs">
                        {getInitials(collaborator.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{collaborator.name}</span>
                    <Badge variant="outline" className="text-xs">{collaborator.role}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add New Item */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add new item..."
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addNewItem()}
                className="flex-1"
              />
              <Button onClick={addNewItem} disabled={!newItemName.trim()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Items List */}
        <div className="space-y-3">
          {items
            .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((item) => (
            <Card key={item.id} className={`transition-all ${item.isCompleted ? 'opacity-75' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={item.isCompleted}
                    onCheckedChange={() => toggleItem(item.id)}
                    className="flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-medium ${item.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                        {item.name}
                      </h3>
                      {getPriorityBadge(item.priority)}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Qty: {item.quantity} {item.unit}</span>
                      <span>Est: ${item.estimatedPrice}</span>
                      {item.actualPrice && (
                        <span className="text-deals font-medium">Actual: ${item.actualPrice}</span>
                      )}
                      <span>Added by {item.addedBy}</span>
                    </div>
                    
                    {item.notes && (
                      <p className="text-sm text-muted-foreground mt-1 italic">{item.notes}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No items found</h3>
              <p className="text-muted-foreground">
                {searchQuery ? 'Try adjusting your search terms' : 'Start by adding your first item to the list'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};