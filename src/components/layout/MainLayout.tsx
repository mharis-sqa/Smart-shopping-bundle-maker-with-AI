import { ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { Navigation } from './Navigation';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
  user: User;
}

export const MainLayout = ({ children, user }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <Navigation user={user} />
      <div className="flex">
        <Sidebar user={user} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};