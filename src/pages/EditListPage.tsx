import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save, Users, Lock, Globe, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const EditListPage = () => {
  const { listId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: 'Family Grocery List',
    description: 'Weekly grocery shopping for the Smith family',
    isShared: true,
    isPublic: false,
    allowCollaboratorInvites: true,
    notifyOnChanges: true
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "List Updated",
      description: "Your list settings have been saved successfully.",
    });
    
    setIsSaving(false);
    navigate(`/dashboard/lists/${listId}`);
  };

  const handleDeleteList = () => {
    navigate(`/dashboard/lists/${listId}/delete`);
  };

  return (
    <>
      <Helmet>
        <title>Edit List - SmartBundle | List Settings</title>
        <meta name="description" content="Edit your shopping list settings, privacy options, and collaboration preferences." />
        <link rel="canonical" href={`${window.location.origin}/dashboard/lists/${listId}/edit`} />
      </Helmet>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/dashboard/lists/${listId}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Edit List</h1>
            <p className="text-muted-foreground">Manage your list settings and preferences</p>
          </div>
        </div>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <p className="text-sm text-muted-foreground">
              Update your list name and description
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">List Name</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter list name..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what this list is for..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Sharing */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy & Sharing</CardTitle>
            <p className="text-sm text-muted-foreground">
              Control who can access and modify your list
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <Label className="text-base font-medium">Enable Sharing</Label>
                  {formData.isShared && <Badge variant="secondary">Shared</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">
                  Allow others to collaborate on this list
                </p>
              </div>
              <Switch
                checked={formData.isShared}
                onCheckedChange={(checked) => setFormData({ ...formData, isShared: checked })}
              />
            </div>

            {formData.isShared && (
              <>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <Label className="text-base font-medium">Public Discovery</Label>
                      {formData.isPublic && <Badge variant="outline">Public</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Make this list discoverable by other users
                    </p>
                  </div>
                  <Switch
                    checked={formData.isPublic}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPublic: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Collaborator Invites</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow collaborators to invite others to this list
                    </p>
                  </div>
                  <Switch
                    checked={formData.allowCollaboratorInvites}
                    onCheckedChange={(checked) => setFormData({ ...formData, allowCollaboratorInvites: checked })}
                  />
                </div>
              </>
            )}

            {!formData.isShared && (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  This list is private and only visible to you
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <p className="text-sm text-muted-foreground">
              Choose how you want to be notified about list activity
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Notify on Changes</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when collaborators add, edit, or complete items
                </p>
              </div>
              <Switch
                checked={formData.notifyOnChanges}
                onCheckedChange={(checked) => setFormData({ ...formData, notifyOnChanges: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button 
            variant="destructive" 
            onClick={handleDeleteList}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete List
          </Button>

          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link to={`/dashboard/lists/${listId}`}>Cancel</Link>
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};