import React from 'react';
import { useAuth } from '../../app/global-context/AuthContext';
import { useNavigate } from '@tanstack/react-router';
import { isRouteAllowed, getDefaultRoute } from '../utils/rolePermissions';
import type { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate({ to: '/login' });
        return;
      }
      
      if (!allowedRoles.includes(user.role)) {
        // Redirect to default route for their role
        const defaultRoute = getDefaultRoute(user.role);
        navigate({ to: defaultRoute });
      }
    }
  }, [user, isLoading, allowedRoles, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Access Denied</h2>
          <p className="text-slate-500">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

