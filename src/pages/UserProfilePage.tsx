import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Camera, Save } from 'lucide-react';

export const UserProfilePage = () => {
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    avatar: null,
    budgetLimit: 500,
    householdSize: 4
  });

  return (
    <>
      <Helmet>
        <title>Profile - SmartBundle | Manage Your Account</title>
        <meta name="description" content="Manage your SmartBundle profile, preferences, and account settings." />
      </Helmet>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={profile.fullName}
                  onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              </div>
              
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shopping Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Monthly Budget Limit ($)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={profile.budgetLimit}
                  onChange={(e) => setProfile({...profile, budgetLimit: Number(e.target.value)})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="household">Household Size</Label>
                <Input
                  id="household"
                  type="number"
                  value={profile.householdSize}
                  onChange={(e) => setProfile({...profile, householdSize: Number(e.target.value)})}
                />
              </div>
              
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};