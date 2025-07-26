import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Share2, UserPlus, Search, Plus, MoreHorizontal } from 'lucide-react';

export const SharedListsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sharedLists, setSharedLists] = useState([
    {
      id: '1',
      title: 'Family Grocery List',
      description: 'Weekly grocery shopping for the Smith family',
      owner: { name: 'John Smith', email: 'john@example.com', avatar: null },
      collaborators: [
        { name: 'Sarah Smith', email: 'sarah@example.com', avatar: null, role: 'editor' },
        { name: 'Mike Johnson', email: 'mike@example.com', avatar: null, role: 'viewer' }
      ],
      itemCount: 15,
      lastUpdated: '2 hours ago',
      role: 'owner',
      isActive: true
    },
    {
      id: '2',
      title: 'Office Supplies',
      description: 'Monthly office supply orders',
      owner: { name: 'Sarah Connor', email: 'sarah.c@company.com', avatar: null },
      collaborators: [
        { name: 'You', email: 'your@email.com', avatar: null, role: 'editor' },
        { name: 'Alex Brown', email: 'alex@company.com', avatar: null, role: 'editor' }
      ],
      itemCount: 8,
      lastUpdated: '1 day ago',
      role: 'collaborator',
      isActive: true
    },
    {
      id: '3',
      title: 'Party Planning',
      description: 'Birthday party supplies and decorations',
      owner: { name: 'Emma Wilson', email: 'emma@example.com', avatar: null },
      collaborators: [
        { name: 'You', email: 'your@email.com', avatar: null, role: 'viewer' },
        { name: 'David Lee', email: 'david@example.com', avatar: null, role: 'editor' }
      ],
      itemCount: 23,
      lastUpdated: '3 days ago',
      role: 'collaborator',
      isActive: false
    }
  ]);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'owner':
        return <Badge className="bg-primary text-primary-foreground">Owner</Badge>;
      case 'editor':
        return <Badge variant="secondary">Editor</Badge>;
      case 'viewer':
        return <Badge variant="outline">Viewer</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>
      <Helmet>
        <title>Shared Lists - SmartBundle | Collaborative Shopping</title>
        <meta name="description" content="Manage shared shopping lists with family, friends, and colleagues. Collaborate on shopping and stay organized together." />
        <link rel="canonical" href={`${window.location.origin}/dashboard/shared-lists`} />
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Shared Lists
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Collaborate seamlessly on shopping lists with family, friends, and colleagues
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative min-w-[280px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search shared lists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-background/60 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:bg-background transition-all"
              />
            </div>
            <Button size="default" className="h-11 px-6 font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              Share List
            </Button>
          </div>
        </div>

        {/* Collaboration Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Total Shared Lists</CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{sharedLists.length}</div>
              <p className="text-sm text-muted-foreground mt-1">Active collaborations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Owned by You</CardTitle>
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sharedLists.filter(list => list.role === 'owner').length}
              </div>
              <p className="text-xs text-muted-foreground">Lists you created</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Collaborating</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sharedLists.filter(list => list.role === 'collaborator').length}
              </div>
              <p className="text-xs text-muted-foreground">Lists shared with you</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sharedLists.reduce((sum, list) => sum + list.itemCount, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Across all lists</p>
            </CardContent>
          </Card>
        </div>

        {/* Shared Lists */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 h-12 p-1">
            <TabsTrigger value="all" className="text-sm font-medium">All Lists</TabsTrigger>
            <TabsTrigger value="owned" className="text-sm font-medium">Owned by Me</TabsTrigger>
            <TabsTrigger value="shared" className="text-sm font-medium">Shared with Me</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="space-y-4">
              {sharedLists.map((list) => (
                <Card key={list.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{list.title}</h3>
                              {getRoleBadge(list.role)}
                              {!list.isActive && <Badge variant="secondary">Inactive</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{list.description}</p>
                            <div className="text-sm text-muted-foreground">
                              {list.itemCount} items • Updated {list.lastUpdated}
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm font-medium">Owner</div>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={list.owner.avatar} />
                              <AvatarFallback className="text-xs">
                                {getInitials(list.owner.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{list.owner.name}</span>
                          </div>
                        </div>

                        {list.collaborators.length > 0 && (
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Collaborators ({list.collaborators.length})</div>
                            <div className="flex flex-wrap gap-2">
                              {list.collaborators.slice(0, 3).map((collaborator, index) => (
                                <div key={index} className="flex items-center gap-2 bg-muted rounded-full px-3 py-1">
                                  <Avatar className="h-5 w-5">
                                    <AvatarImage src={collaborator.avatar} />
                                    <AvatarFallback className="text-xs">
                                      {getInitials(collaborator.name)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs">{collaborator.name}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {collaborator.role}
                                  </Badge>
                                </div>
                              ))}
                              {list.collaborators.length > 3 && (
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-xs">
                                  +{list.collaborators.length - 3}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline">
                          <Share2 className="h-4 w-4 mr-2" />
                          Manage Access
                        </Button>
                        <Button>
                          View List
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="owned">
            <div className="space-y-4">
              {sharedLists.filter(list => list.role === 'owner').map((list) => (
                <Card key={list.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{list.title}</h3>
                        <p className="text-sm text-muted-foreground">{list.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Manage</Button>
                        <Button size="sm">View</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shared">
            <div className="space-y-4">
              {sharedLists.filter(list => list.role === 'collaborator').map((list) => (
                <Card key={list.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{list.title}</h3>
                        <p className="text-sm text-muted-foreground">Shared by {list.owner.name}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Leave</Button>
                        <Button size="sm">View</Button>
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