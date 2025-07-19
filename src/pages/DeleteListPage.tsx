import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Trash2, AlertTriangle, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const DeleteListPage = () => {
  const { listId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [confirmationText, setConfirmationText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Mock list data
  const listData = {
    title: 'Family Grocery List',
    itemCount: 12,
    collaborators: 3,
    createdAt: '2024-01-15'
  };

  const isConfirmationValid = confirmationText === listData.title;

  const handleDelete = async () => {
    if (!isConfirmationValid) return;

    setIsDeleting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "List Deleted",
      description: `"${listData.title}" has been permanently deleted.`,
      variant: "destructive",
    });
    
    navigate('/dashboard');
  };

  return (
    <>
      <Helmet>
        <title>Delete List - SmartBundle | Confirm Deletion</title>
        <meta name="description" content="Confirm the permanent deletion of your shopping list. This action cannot be undone." />
        <link rel="canonical" href={`${window.location.origin}/dashboard/lists/${listId}/delete`} />
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
            <h1 className="text-3xl font-bold text-destructive">Delete List</h1>
            <p className="text-muted-foreground">This action cannot be undone</p>
          </div>
        </div>

        {/* Warning Alert */}
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <strong>Warning:</strong> This will permanently delete your list and all its data. 
            This action cannot be undone and all collaborators will lose access to this list.
          </AlertDescription>
        </Alert>

        {/* List Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              List Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label className="text-sm font-medium">List Name</Label>
                <p className="text-lg font-semibold">{listData.title}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Created</Label>
                <p className="text-lg">{new Date(listData.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Items</Label>
                <p className="text-lg">{listData.itemCount} items</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Collaborators</Label>
                <p className="text-lg">{listData.collaborators} people</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Confirmation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Confirm Deletion</CardTitle>
            <p className="text-sm text-muted-foreground">
              Type the list name <strong>"{listData.title}"</strong> to confirm deletion
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="confirmation">List Name Confirmation</Label>
              <Input
                id="confirmation"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder={`Type "${listData.title}" to confirm`}
                className={isConfirmationValid ? 'border-destructive' : ''}
              />
              {confirmationText && !isConfirmationValid && (
                <p className="text-sm text-destructive">
                  List name doesn't match. Please type exactly: "{listData.title}"
                </p>
              )}
              {isConfirmationValid && (
                <p className="text-sm text-green-600 font-medium">
                  ✓ List name confirmed
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* What Will Happen */}
        <Card>
          <CardHeader>
            <CardTitle>What will be deleted?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                All {listData.itemCount} items in this list
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                Item notes, prices, and completion status
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                All sharing permissions and collaborator access
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                List history and activity logs
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                Associated price tracking alerts
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link to={`/dashboard/lists/${listId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancel
            </Link>
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!isConfirmationValid || isDeleting}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            {isDeleting ? 'Deleting...' : 'Delete List Forever'}
          </Button>
        </div>
      </div>
    </>
  );
};