import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore, selectIsAuthenticated } from '../store';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
