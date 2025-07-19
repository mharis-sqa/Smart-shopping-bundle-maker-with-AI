import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Mail, 
  Copy, 
  UserPlus, 
  Share2, 
  Check,
  X,
  Crown,
  Eye,
  Edit,
  QrCode
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ListSharingPage = () => {
  const { listId } = useParams();
  const { toast } = useToast();

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('viewer');
  const [isInviting, setIsInviting] = useState(false);

  // Mock data
  const [listData] = useState({
    title: 'Family Grocery List',
    shareLink: `https://smartbundle.com/lists/shared/${listId}`,
    qrCode: 'data:image/svg+xml;base64,...' // Placeholder QR code
  });

  const [collaborators, setCollaborators] = useState([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      avatar: null,
      role: 'owner',
      joinedAt: '2024-01-15',
      lastActive: '2 hours ago'
    },
    {
      id: '2',
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      avatar: null,
      role: 'editor',
      joinedAt: '2024-01-16',
      lastActive: '1 day ago'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      avatar: null,
      role: 'viewer',
      joinedAt: '2024-01-18',
      lastActive: '3 days ago'
    }
  ]);

  const [pendingInvites] = useState([
    {
      id: '1',
      email: 'emma@example.com',
      role: 'editor',
      sentAt: '2024-01-19',
      expiresAt: '2024-01-26'
    }
  ]);

  const sendInvite = async () => {
    if (!inviteEmail || !isValidEmail(inviteEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsInviting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Invitation Sent",
      description: `Invited ${inviteEmail} as ${inviteRole} to collaborate on "${listData.title}".`,
    });
    
    setInviteEmail('');
    setInviteRole('viewer');
    setIsInviting(false);
  };

  const copyShareLink = async () => {
    await navigator.clipboard.writeText(listData.shareLink);
    toast({
      title: "Link Copied",
      description: "Share link has been copied to your clipboard.",
    });
  };

  const changeRole = (collaboratorId: string, newRole: string) => {
    setCollaborators(collaborators.map(c => 
      c.id === collaboratorId ? { ...c, role: newRole } : c
    ));
    toast({
      title: "Role Updated",
      description: "Collaborator role has been updated successfully.",
    });
  };

  const removeCollaborator = (collaboratorId: string) => {
    const collaborator = collaborators.find(c => c.id === collaboratorId);
    setCollaborators(collaborators.filter(c => c.id !== collaboratorId));
    toast({
      title: "Collaborator Removed",
      description: `${collaborator?.name} has been removed from the list.`,
    });
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'editor':
        return <Edit className="h-4 w-4 text-blue-500" />;
      case 'viewer':
        return <Eye className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'owner':
        return <Badge className="bg-yellow-500 text-white">Owner</Badge>;
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
        <title>Share List - SmartBundle | Manage Collaborators</title>
        <meta name="description" content="Invite collaborators and manage sharing settings for your shopping list." />
        <link rel="canonical" href={`${window.location.origin}/dashboard/lists/${listId}/share`} />
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/dashboard/lists/${listId}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Share List</h1>
            <p className="text-muted-foreground">Invite collaborators to "{listData.title}"</p>
          </div>
        </div>

        <Tabs defaultValue="invite" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="invite">Invite People</TabsTrigger>
            <TabsTrigger value="collaborators">Collaborators</TabsTrigger>
            <TabsTrigger value="link">Share Link</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>

          <TabsContent value="invite" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Invite by Email
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Send an invitation link to collaborate on this list
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="Enter email address..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Permission Level</Label>
                    <Select value={inviteRole} onValueChange={setInviteRole}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viewer">
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <div>
                              <div>Viewer</div>
                              <div className="text-xs text-muted-foreground">Can view items</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="editor">
                          <div className="flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                            <div>
                              <div>Editor</div>
                              <div className="text-xs text-muted-foreground">Can add and edit items</div>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={sendInvite} 
                  disabled={!inviteEmail || isInviting}
                  className="flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  {isInviting ? 'Sending...' : 'Send Invitation'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collaborators" className="space-y-4">
            {collaborators.map((collaborator) => (
              <Card key={collaborator.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={collaborator.avatar} />
                        <AvatarFallback>
                          {getInitials(collaborator.name)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{collaborator.name}</h3>
                          {getRoleIcon(collaborator.role)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {collaborator.email} • Joined {new Date(collaborator.joinedAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last active {collaborator.lastActive}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {collaborator.role !== 'owner' ? (
                        <Select 
                          value={collaborator.role} 
                          onValueChange={(value) => changeRole(collaborator.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="viewer">Viewer</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        getRoleBadge(collaborator.role)
                      )}

                      {collaborator.role !== 'owner' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCollaborator(collaborator.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="link" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Share Link
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Anyone with this link can view the list
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    value={listData.shareLink} 
                    readOnly 
                    className="flex-1 font-mono text-sm"
                  />
                  <Button onClick={copyShareLink} variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">QR Code</h3>
                      <p className="text-sm text-muted-foreground">
                        Share this QR code for easy mobile access
                      </p>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                      <QrCode className="h-4 w-4" />
                      Generate QR Code
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingInvites.length > 0 ? (
              pendingInvites.map((invite) => (
                <Card key={invite.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{invite.email}</h3>
                          <Badge variant="outline">Pending</Badge>
                          {getRoleBadge(invite.role)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Sent {new Date(invite.sentAt).toLocaleDateString()} • 
                          Expires {new Date(invite.expiresAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Resend
                        </Button>
                        <Button variant="ghost" size="icon">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Pending Invites</h3>
                  <p className="text-muted-foreground">
                    All invitations have been accepted or expired
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};