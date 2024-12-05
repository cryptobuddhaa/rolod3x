import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useFirebase } from '../contexts/FirebaseContext';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useFirebase();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user && location.pathname !== '/') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}